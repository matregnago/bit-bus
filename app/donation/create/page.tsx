import { ScrollArea } from "@/components/ui/scroll-area";
import DonationForm from "./donationform";

export default function Home() {
  return (
    <ScrollArea className="h-full">
      <DonationForm />
    </ScrollArea>
  );
}
