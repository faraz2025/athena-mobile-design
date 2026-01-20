import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

// ---- Mock Data ----
const mockFiles = [
    {
        id: 1,
        name: "Site_Plan_v1.pdf",
        size: "2.4 MB",
        uploadedAt: "2 days ago",
        category: "Tender Documents",
        type: "PDF",
    },
    {
        id: 2,
        name: "BOQ_Final.xlsx",
        size: "780 KB",
        uploadedAt: "4 days ago",
        category: "Tender Documents",
        type: "XLS",
    },
    {
        id: 3,
        name: "Technical_Specifications.pdf",
        size: "1.9 MB",
        uploadedAt: "1 week ago",
        category: "Tender Documents",
        type: "PDF",
    },

    {
        id: 4,
        name: "Environmental_Clearance.pdf",
        size: "1.1 MB",
        uploadedAt: "5 days ago",
        category: "Approvals & NOCs",
        type: "PDF",
    },
    {
        id: 5,
        name: "Fire_NOC.pdf",
        size: "620 KB",
        uploadedAt: "2 weeks ago",
        category: "Approvals & NOCs",
        type: "PDF",
    },
    {
        id: 6,
        name: "Municipal_Approval_Letter.pdf",
        size: "950 KB",
        uploadedAt: "10 days ago",
        category: "Approvals & NOCs",
        type: "PDF",
    },

    {
        id: 7,
        name: "Floor_Plan_Ground_Floor.dwg",
        size: "4.2 MB",
        uploadedAt: "3 days ago",
        category: "Drawings",
        type: "DWG",
    },
    {
        id: 8,
        name: "Elevation_View.pdf",
        size: "2.8 MB",
        uploadedAt: "6 days ago",
        category: "Drawings",
        type: "PDF",
    },
    {
        id: 9,
        name: "Structural_Layout_v3.pdf",
        size: "3.5 MB",
        uploadedAt: "1 week ago",
        category: "Drawings",
        type: "PDF",
    },

    {
        id: 10,
        name: "Invoice_Jan_2026.pdf",
        size: "900 KB",
        uploadedAt: "3 days ago",
        category: "Invoices",
        type: "PDF",
    },
    {
        id: 11,
        name: "Invoice_Feb_2026.pdf",
        size: "1.2 MB",
        uploadedAt: "1 day ago",
        category: "Invoices",
        type: "PDF",
    },
    {
        id: 12,
        name: "Payment_Receipt_#4582.pdf",
        size: "420 KB",
        uploadedAt: "5 days ago",
        category: "Invoices",
        type: "PDF",
    },
];


const FileRow = ({ file }: { file: any }) => (
    <div className="p-3 flex items-center justify-between hover:bg-secondary/10 transition-colors">
        <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                {file.type}
            </div>
            <div>
                <p className="text-xs font-medium text-foreground">{file.name}</p>
                <p className="text-[10px] text-muted-foreground">
                    {file.size} • {file.uploadedAt}
                </p>
            </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4 text-muted-foreground" />
        </Button>
    </div>
);

function Files() {
    const [viewMode, setViewMode] = useState<"grouped" | "list">("grouped");

    const groupedFiles = mockFiles.reduce((acc: any, file) => {
        acc[file.category] = acc[file.category] || [];
        acc[file.category].push(file);
        return acc;
    }, {});



    return (
        <div className="space-y-4">
            {/* View Toggle */}
            <div className="flex justify-end gap-2">
                <Button
                    variant={viewMode === "grouped" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grouped")}
                >
                    <LayoutGrid className="h-4 w-4 mr-1" /> Grouped
                </Button>
                <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                >
                    <List className="h-4 w-4 mr-1" /> List
                </Button>
            </div>

            {viewMode === "grouped" && (
                <>
                    {Object.entries(groupedFiles).map(([category, files]: any) => (
                        <Card key={category} className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-secondary/30 py-3 px-4 flex flex-row items-center justify-between space-y-0">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-background rounded-md shadow-sm">
                                        <FileText className="h-4 w-4 text-primary" />
                                    </div>
                                    <CardTitle className="text-sm font-medium">{category}</CardTitle>
                                </div>
                                <Badge variant="outline" className="text-[10px] bg-background">
                                    {files.length} Files
                                </Badge>
                            </CardHeader>
                            <div className="divide-y divide-border/50">
                                {files.map((file: any) => (
                                    <FileRow key={file.id} file={file} />
                                ))}
                            </div>
                        </Card>
                    ))}
                </>
            )}

            {
                viewMode === "list" && (
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-secondary/30 py-3 px-4">
                            <CardTitle className="text-sm font-medium">All Uploaded Files</CardTitle>
                        </CardHeader>
                        <div className="divide-y divide-border/50">
                            {mockFiles
                                .sort((a, b) => a.id - b.id)
                                .map((file) => (
                                    <div key={file.id} className="flex items-center justify-between">
                                        <FileRow file={file} />
                                        <Badge
                                            variant="secondary"
                                            className="mr-3 text-[10px]"
                                        >
                                            {file.category}
                                        </Badge>
                                    </div>
                                ))}
                        </div>
                    </Card>
                )
            }
        </div>
    );
}

export default Files;
