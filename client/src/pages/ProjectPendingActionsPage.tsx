import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Mail, ReceiptIndianRupee } from "lucide-react";
import { useLocation, useRoute } from "wouter";

const MOCK_PENDING_ACTIONS = [
    {
        id: "daily_progress_tracking",
        title: "Upload Daily Expenses / Bills",
        description: "Upload today’s expense vouchers and bills for this project.",
        icon: ReceiptIndianRupee,
    },
    {
        id: "check_project_timeline",
        title: "Check Project Timeline & Delay Justification",
        description: "Confirm if project can be completed on time or generate a delay justification email.",
        icon: Mail,
    },
    {
        id: "verify_emd_refund",
        title: "Verify EMD Refund",
        description: "Mark whether EMD refund has been received and trigger a follow-up email if needed.",
        icon: FileText,
    },
    {
        id: "payment_received_check",
        title: "Final Payment & Security Release",
        description: "Upload final payment document and, if security is not received, create a release email.",
        icon: FileText,
    },
];

export default function ProjectPendingActionsPage() {
    const [match, params] = useRoute("/project/:id/pending-actions");
    const projectId = params?.id;
    const [, navigate] = useLocation();

    return (
        <MobileLayout showBottomNav={false}>
            <div className="bg-primary text-primary-foreground pt-8 pb-6 px-5 rounded-b-[2rem] shadow-lg relative z-10 mb-6">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-white/10 -ml-2"
                        onClick={() => projectId && navigate(`/project/${projectId}`)}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold leading-tight">Pending Actions</h1>
                        <p className="text-xs opacity-80 mt-1">All open actions related to this project.</p>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-20 space-y-4">
                {MOCK_PENDING_ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Card key={action.id} className="border-none shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-sm font-semibold leading-snug">
                                            {action.title}
                                        </CardTitle>
                                        <CardDescription className="text-xs mt-0.5">
                                            {action.description}
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                                    Pending
                                </Badge>
                            </CardHeader>
                            <CardContent className="pt-0 flex justify-end">
                                <Button
                                    size="sm"
                                    className="rounded-full px-4 text-xs"
                                    onClick={() => {
                                        if (projectId) {
                                            navigate(`/projects/${projectId}/${action.id}`);
                                        }
                                    }}
                                >
                                    Open
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </MobileLayout>
    );
}
