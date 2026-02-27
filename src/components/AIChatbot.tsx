import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';
import {
    Bot, Send, X, Sparkles, User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { esgMetrics } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import type { Asset, AlertItem, Project } from '@/types';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

function getAIResponse(query: string, assets: Asset[], projects: Project[], alerts: AlertItem[]): string {
    const q = query.toLowerCase();

    // Critical / risk queries
    if (q.includes('risk') || q.includes('critical') || q.includes('danger') || q.includes('high risk')) {
        const criticalAssets = assets.filter(a => a.riskLevel === 'critical' || a.riskLevel === 'high');
        return `🔴 **${criticalAssets.length} high-risk assets detected:**\n\n${criticalAssets.map(a =>
            `• **${a.name}** (${a.id}) — ${a.failureProbability}% failure probability, health: ${a.healthScore}/100, est. ${a.daysToFailure} days to failure`
        ).join('\n')}\n\n⚠️ Immediate inspection recommended for assets with <30 days to failure.`;
    }

    // Why is [asset] high risk
    if (q.includes('why') && (q.includes('bridge') || q.includes('beam') || q.includes('pillar'))) {
        const keyword = q.includes('bridge') ? 'bridge' : q.includes('beam') ? 'beam' : 'pillar';
        const found = assets.filter(a => a.type === keyword && (a.riskLevel === 'high' || a.riskLevel === 'critical'));
        if (found.length > 0) {
            const a = found[0];
            return `🔍 **${a.name}** is ${a.riskLevel} risk because:\n\n• Vibration: ${a.vibration} mm/s (${a.vibration > 5 ? '⚠️ HIGH' : '✅ Normal'})\n• Load stress: ${a.loadStress}% (${a.loadStress > 70 ? '⚠️ OVERLOADED' : '✅ Normal'})\n• Corrosion: ${(a.corrosionLevel * 100).toFixed(0)}% (${a.corrosionLevel > 0.3 ? '⚠️ CORRODING' : '✅ Acceptable'})\n• Crack probability: ${a.crackProbability}%\n• Estimated failure in: **${a.daysToFailure} days**\n\n💡 Recommendation: Schedule preventive maintenance within ${Math.min(a.daysToFailure, 14)} days.`;
        }
        return `No high-risk ${keyword} assets found. All ${keyword} assets are in acceptable condition.`;
    }

    // Maintenance queries
    if (q.includes('maintenance') || q.includes('repair') || q.includes('schedule')) {
        const urgent = assets.filter(a => a.daysToFailure < 30).sort((a, b) => a.daysToFailure - b.daysToFailure);
        return `🔧 **Maintenance Schedule — ${urgent.length} urgent tasks:**\n\n${urgent.map(a =>
            `• **${a.name}** — ${a.daysToFailure} days to failure | Next: ${a.nextMaintenance || 'Not scheduled'} | Est. cost: ₹${(a.estimatedRepairCost / 1000).toFixed(0)}K`
        ).join('\n')}\n\n💰 Total estimated repair cost: ₹${(urgent.reduce((s, a) => s + a.estimatedRepairCost, 0) / 100000).toFixed(1)}L\n\n✅ Scheduling preventive maintenance could save 30-40% of these costs.`;
    }

    // Budget queries
    if (q.includes('budget') || q.includes('cost') || q.includes('spend') || q.includes('money')) {
        const p = projects[0];
        const pct = Math.round((p.budgetUsed / p.budget) * 100);
        const remaining = ((p.budget - p.budgetUsed) / 100).toFixed(1);
        return `💰 **Budget Status for ${p.name}:**\n\n• Total budget: ₹${(p.budget / 100).toFixed(0)} Cr\n• Spent: ₹${(p.budgetUsed / 100).toFixed(0)} Cr (${pct}%)\n• Remaining: ₹${remaining} Cr\n• Status: ${pct < 80 ? '✅ Under budget' : pct < 95 ? '⚠️ Approaching limit' : '🔴 Over budget'}\n\n📊 The project is ${pct < 85 ? 'on track financially.' : 'nearing budget limits. Cost optimization recommended.'}`;
    }

    // Alert queries
    if (q.includes('alert') || q.includes('notification') || q.includes('warning')) {
        const critical = alerts.filter(a => a.severity === 'critical');
        const warnings = alerts.filter(a => a.severity === 'warning');
        return `🔔 **Active Alerts: ${alerts.length} total**\n\n• 🔴 Critical: ${critical.length}\n• 🟡 Warning: ${warnings.length}\n• 🔵 Info: ${alerts.length - critical.length - warnings.length}\n\n${critical.length > 0 ? `⚡ Most urgent: **${critical[0].title}** — ${critical[0].description}` : 'No critical alerts at this time.'}\n\nAll alerts are being monitored in real-time.`;
    }

    // Health / score queries
    if (q.includes('health') || q.includes('score') || q.includes('condition')) {
        const avg = Math.round(assets.reduce((s, a) => s + a.healthScore, 0) / assets.length);
        const healthy = assets.filter(a => a.healthScore >= 80).length;
        const degraded = assets.filter(a => a.healthScore < 60).length;
        return `🏗️ **Infrastructure Health Overview:**\n\n• Average health score: **${avg}/100**\n• Healthy assets (>80): ${healthy}/${assets.length}\n• Degraded assets (<60): ${degraded}/${assets.length}\n• Best: ${assets.reduce((b, a) => a.healthScore > b.healthScore ? a : b).name} (${assets.reduce((b, a) => a.healthScore > b.healthScore ? a : b).healthScore}/100)\n• Worst: ${assets.reduce((b, a) => a.healthScore < b.healthScore ? a : b).name} (${assets.reduce((b, a) => a.healthScore < b.healthScore ? a : b).healthScore}/100)\n\nOverall structural integrity is ${avg >= 75 ? '✅ strong' : avg >= 60 ? '⚠️ moderate' : '🔴 concerning'}.`;
    }

    // ESG / sustainability
    if (q.includes('esg') || q.includes('sustainability') || q.includes('carbon') || q.includes('emission') || q.includes('green')) {
        return `🌿 **ESG & Sustainability Metrics:**\n\n• Sustainability score: **${esgMetrics.sustainabilityScore}/100**\n• Carbon emissions: ${esgMetrics.carbonEmissions} tCO₂ (target: ${esgMetrics.carbonTarget})\n• Energy efficiency: ${esgMetrics.energyEfficiency}%\n• Water usage: ${esgMetrics.waterUsage} KL (target: ${esgMetrics.waterTarget})\n• Waste recycled: ${esgMetrics.wasteRecycled}%\n\n📊 The project is ${esgMetrics.carbonEmissions < esgMetrics.carbonTarget ? '✅ below carbon target' : '⚠️ above carbon target'} and ${esgMetrics.sustainabilityScore >= 80 ? 'meeting' : 'not yet meeting'} sustainability goals.`;
    }

    // Project / progress
    if (q.includes('project') || q.includes('progress') || q.includes('completion') || q.includes('status')) {
        return `📋 **Project Summary:**\n\n${projects.map(p =>
            `• **${p.name}** — ${p.completion}% complete | ${p.status} | Manager: ${p.manager}`
        ).join('\n')}\n\n🎯 Primary project: ${projects[0].name} is ${projects[0].completion}% complete with a target end date of ${projects[0].endDate}.`;
    }

    // Asset count
    if (q.includes('how many') || q.includes('total') || q.includes('count')) {
        return `📊 **Current System Statistics:**\n\n• Total assets: ${assets.length}\n• Total projects: ${projects.length}\n• Active alerts: ${alerts.length}\n• Critical assets: ${assets.filter(a => a.riskLevel === 'critical').length}\n• Upcoming maintenance: ${assets.filter(a => a.daysToFailure < 30).length} assets need attention within 30 days`;
    }

    // Help / greeting
    if (q.includes('help') || q.includes('hi') || q.includes('hello') || q.includes('hey') || q === '') {
        return `👋 Hi! I'm the **InfraTwin AI Assistant**. I can help you with:\n\n• 🔴 **Risk analysis** — "Which assets are high risk?"\n• 🔧 **Maintenance** — "Show me maintenance schedule"\n• 💰 **Budget** — "What is the budget status?"\n• 🔔 **Alerts** — "How many critical alerts?"\n• 🏗️ **Health** — "What is the infrastructure health?"\n• 🌿 **ESG** — "Show sustainability metrics"\n• 📋 **Projects** — "What is the project status?"\n• 🔍 **Analysis** — "Why is Bridge Section A high risk?"\n\nJust type your question!`;
    }

    return `I understand you're asking about "${query}". Let me help:\n\n• For **asset risk analysis**, try: "Which assets are high risk?"\n• For **maintenance info**, try: "Show maintenance schedule"\n• For **budget status**, try: "What is the budget?"\n• For **alerts**, try: "How many alerts?"\n• For **health scores**, try: "What is the health condition?"\n\nType **help** to see all available commands.`;
}

export function AIChatbot() {
    const { assets, projects, alerts } = useApp();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: '👋 Hi! I\'m the **InfraTwin AI Assistant**. Ask me anything about your infrastructure — risk analysis, maintenance, budget, alerts, or health scores!',
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg: Message = { role: 'user', content: input.trim(), timestamp: new Date() };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            const response = getAIResponse(userMsg.content, assets, projects, alerts);
            setMessages((prev) => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
            setIsTyping(false);
        }, 600 + Math.random() * 800);
    };

    const quickQuestions = [
        'Which assets are high risk?',
        'Show maintenance schedule',
        'What is the budget status?',
        'How many critical alerts?',
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all bg-primary text-primary-foreground hover:scale-105"
                    size="icon"
                >
                    {open ? <X className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[440px] p-0 flex flex-col">
                <SheetHeader className="px-4 pt-4 pb-3 border-b">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <SheetTitle className="text-sm">InfraTwin AI Assistant</SheetTitle>
                            <SheetDescription className="text-xs">Ask about risks, maintenance, budget & more</SheetDescription>
                        </div>
                        <Badge variant="secondary" className="ml-auto text-[10px]">AI Powered</Badge>
                    </div>
                </SheetHeader>

                {/* Messages */}
                <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
                    <div className="space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 shrink-0 mt-0.5">
                                        <Bot className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                )}
                                <div className={cn(
                                    'max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed',
                                    msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                )}>
                                    <div className="whitespace-pre-line" dangerouslySetInnerHTML={{
                                        __html: msg.content
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/\n/g, '<br/>')
                                    }} />
                                    <p className={cn('text-[10px] mt-1 opacity-50',
                                        msg.role === 'user' ? 'text-right' : ''
                                    )}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                {msg.role === 'user' && (
                                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary shrink-0 mt-0.5">
                                        <User className="w-3.5 h-3.5 text-primary-foreground" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-2">
                                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 shrink-0">
                                    <Bot className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <div className="bg-muted rounded-lg px-3 py-2">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0ms]" />
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:150ms]" />
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:300ms]" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Quick Questions */}
                {messages.length <= 2 && (
                    <div className="px-4 pb-2">
                        <p className="text-[10px] text-muted-foreground mb-1.5">Quick questions:</p>
                        <div className="flex flex-wrap gap-1.5">
                            {quickQuestions.map((q) => (
                                <Button
                                    key={q}
                                    variant="outline"
                                    size="sm"
                                    className="text-[10px] h-6 px-2"
                                    onClick={() => { setInput(q); }}
                                >
                                    {q}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-3 border-t">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                        <Input
                            placeholder="Ask about infrastructure..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="h-9 text-xs"
                        />
                        <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={!input.trim() || isTyping}>
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
