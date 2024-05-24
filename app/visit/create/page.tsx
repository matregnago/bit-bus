import { NavBar } from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, Card, CardFooter } from "@/components/ui/card"

export default function CreateVisit() {
  return (
    <div>
        <NavBar />
    <div className="max-w-4xl mx-auto my-12 space-y-6 py-24">
        <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Visitor Scheduling</h1>
            <p className="text-gray-500 dark:text-gray-400">Schedule and register your visitors to our museum.</p>
        </div>
        <Card>
            <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="visit-date">Visit Date</Label>
                <Input id="visit-date" type="date" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="visit-time">Visit Time</Label>
                <Input id="visit-time" type="time" />
                </div>
            </div>
            <div className="max-w-md mx-auto space-y-6">
                <Card>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter visitor name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="id">ID</Label>
                        <Input id="id" placeholder="Enter visitor ID" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Enter visitor email" type="email" />
                    </div>
                    </div>
                    <div className="flex items-center justify-between">
                    <Button>Add Visitor</Button>
                    </div>
                </CardContent>
                </Card>
            </div>
            </CardContent>
            <CardFooter>
            <Button className="w-full" type="submit">
                Schedule Visitation
            </Button>
            </CardFooter>
        </Card>
        </div>
        <Footer />
    </div>
  )
}