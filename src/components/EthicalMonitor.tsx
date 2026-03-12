import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, ShieldAlert, ShieldX, 
  Eye, Lock, Fingerprint, RefreshCw,
  AlertCircle, CheckCircle, Info
} from 'lucide-react';
import { cn } from '../utils/cn';

const alerts = [
  { 
    id: 1, 
    type: 'Security', 
    severity: 'High', 
    message: 'Potential SQL injection vulnerability detected in generated database adapter.', 
    remediation: 'Implement parameterized queries and input validation layer.',
    recommendation: 'Use an ORM with built-in protection or strictly enforce prepared statements.',
    timestamp: '10 mins ago'
  },
  { 
    id: 2, 
    type: 'Bias', 
    severity: 'Medium', 
    message: 'Demographic bias detected in user recommendation algorithm logic.', 
    remediation: 'Re-evaluate training data distribution and implement fairness constraints.',
    recommendation: 'Audit the dataset for underrepresented groups and apply re-weighting techniques.',
    timestamp: '1 hour ago'
  },
  { 
    id: 3, 
    type: 'Privacy', 
    severity: 'Low', 
    message: 'Verbose logging may expose sensitive user metadata in production.', 
    remediation: 'Apply PII masking to logging service and restrict log access.',
    recommendation: 'Implement a centralized logging policy that automatically redacts patterns matching PII.',
    timestamp: '3 hours ago'
  },
  {
    id: 4,
    type: 'Ethics',
    severity: 'High',
    message: 'Project requirements suggest automated decision-making without human-in-the-loop for high-stakes outcomes.',
    remediation: 'Integrate a mandatory human review step for final decisions.',
    recommendation: 'Align with Or4cl3 Ethical Charter: "AI must assist, not replace, critical human judgment."',
    timestamp: 'Just now'
  }
];

export const EthicalMonitor: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 overflow-y-auto h-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-daedalus-accent" />
            Ethical AI Monitoring Module
          </h2>
          <p className="text-daedalus-muted text-sm mt-1">Continuous assessment of Daedalus's architectural and code decisions.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline py-2 px-4 text-xs flex items-center gap-2">
            <RefreshCw className="w-3 h-3" />
            Run Full Audit
          </button>
        </div>
      </header>

      {/* Monitoring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Assessment Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MonitorCard icon={<Eye className="text-blue-400" />} label="Bias Detection" status="Monitoring" score={98} />
            <MonitorCard icon={<Lock className="text-daedalus-accent" />} label="Security Audit" status="Active" score={94} />
            <MonitorCard icon={<Fingerprint className="text-purple-400" />} label="Fairness Check" status="Monitoring" score={99} />
          </div>

          <div className="glass-panel p-6 space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-daedalus-accent" />
              Proactive Ethics Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnalysisCard 
                title="Requirement Scanning" 
                description="Analyzing project goals for ethical risks and alignment with Or4cl3 principles."
                status="Complete"
                findings="1 Risk Detected"
              />
              <AnalysisCard 
                title="Code Bias Audit" 
                description="Scanning generated logic for algorithmic bias and discriminatory patterns."
                status="Active"
                findings="Monitoring..."
              />
            </div>
          </div>

          <div className="glass-panel p-6 space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-daedalus-accent" />
              Active Ethical Alerts
            </h3>
            <div className="space-y-4">
              {alerts.map(alert => (
                <AlertItem key={alert.id} {...alert} />
              ))}
            </div>
          </div>
        </div>

        {/* Remediation & Policy */}
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-daedalus-accent" />
              Remediation Engine
            </h3>
            <div className="space-y-4">
              <p className="text-xs text-daedalus-muted leading-relaxed">
                Daedalus has suggested 4 remediation steps for current vulnerabilities. 
                Approval from a <span className="text-daedalus-accent">Technical Lead</span> is required to apply fixes.
              </p>
              <button className="w-full btn-primary py-2 text-xs">Review Suggested Fixes</button>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-daedalus-muted">Compliance Status</h3>
            <div className="space-y-3">
              <ComplianceRow label="GDPR Compliance" status="Verified" />
              <ComplianceRow label="SOC2 Type II" status="In Progress" />
              <ComplianceRow label="Ethical AI Charter" status="Verified" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MonitorCard = ({ icon, label, status, score }: { icon: React.ReactNode, label: string, status: string, score: number }) => (
  <div className="glass-panel p-4 space-y-4">
    <div className="flex items-center justify-between">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">{icon}</div>
      <span className="text-[10px] font-mono text-daedalus-accent animate-pulse">{status}</span>
    </div>
    <div>
      <div className="text-xs text-daedalus-muted font-mono uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold">{score}%</div>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className="h-full bg-daedalus-accent" style={{ width: `${score}%` }} />
    </div>
  </div>
);

const AlertItem = ({ type, severity, message, remediation, recommendation, timestamp }: any) => (
  <div className="p-4 rounded-lg border border-white/5 bg-white/5 space-y-3 hover:border-white/10 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-[10px] font-mono px-2 py-0.5 rounded",
          severity === 'High' ? "bg-red-500/10 text-red-400 border border-red-500/20" :
          severity === 'Medium' ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
          "bg-blue-500/10 text-blue-400 border border-blue-500/20"
        )}>
          {severity} Severity
        </span>
        <span className="text-[10px] font-mono text-daedalus-muted uppercase">{type}</span>
      </div>
      <span className="text-[10px] font-mono text-daedalus-muted">{timestamp}</span>
    </div>
    <p className="text-sm font-medium">{message}</p>
    <div className="space-y-2">
      <div className="flex items-start gap-2 p-2 rounded bg-daedalus-bg/50 border border-white/5">
        <Info className="w-3 h-3 text-daedalus-accent mt-0.5 shrink-0" />
        <p className="text-[11px] text-daedalus-muted italic">
          <span className="text-daedalus-accent font-bold not-italic">Remediation:</span> {remediation}
        </p>
      </div>
      {recommendation && (
        <div className="flex items-start gap-2 p-2 rounded bg-daedalus-accent/5 border border-daedalus-accent/10">
          <ShieldCheck className="w-3 h-3 text-daedalus-accent mt-0.5 shrink-0" />
          <p className="text-[11px] text-daedalus-ink">
            <span className="font-bold">Recommendation:</span> {recommendation}
          </p>
        </div>
      )}
    </div>
  </div>
);

const AnalysisCard = ({ title, description, status, findings }: { title: string, description: string, status: string, findings: string }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
    <div className="flex justify-between items-start">
      <h4 className="text-sm font-bold">{title}</h4>
      <span className={cn(
        "text-[10px] font-mono px-2 py-0.5 rounded",
        status === 'Complete' ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400 animate-pulse"
      )}>{status}</span>
    </div>
    <p className="text-xs text-daedalus-muted leading-relaxed">{description}</p>
    <div className="pt-2 flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-daedalus-accent" />
      <span className="text-[10px] font-mono text-daedalus-accent uppercase tracking-widest">{findings}</span>
    </div>
  </div>
);

const ComplianceRow = ({ label, status }: { label: string, status: string }) => (
  <div className="flex items-center justify-between text-xs">
    <span className="text-daedalus-muted">{label}</span>
    <div className="flex items-center gap-1.5">
      {status === 'Verified' ? <CheckCircle className="w-3 h-3 text-daedalus-accent" /> : <RefreshCw className="w-3 h-3 text-blue-400 animate-spin" />}
      <span className={status === 'Verified' ? "text-daedalus-ink" : "text-blue-400"}>{status}</span>
    </div>
  </div>
);
