import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Oops, page wasn't found.</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Frankly not sure how we got here, but glad to know we have an error page and that it works! Anyway, <a href="/">let's go back to the main site</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
