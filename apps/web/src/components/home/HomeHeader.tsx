import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface HomeHeaderProps {
    trackCount: number;
}

export function HomeHeader({ trackCount }: HomeHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My musics</h1>
                <p className="text-muted-foreground mt-1">
                    {trackCount} tracks in your collection
                </p>
            </div>
            <Button className="gap-2 cursor-pointer text-white">
                <Upload className="h-4 w-4" />
                Upload
            </Button>
        </div>
    );
}
