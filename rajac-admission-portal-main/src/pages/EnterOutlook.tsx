import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EnterOutlook = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedDate) {
      setError("Please choose your exam date.");
      return;
    }
    if (!selectedTime) {
      setError("Please choose your exam time.");
      return;
    }
    setSubmitting(true);

    // Save date/time to form record in Supabase
    const { error: updateErr } = await supabase
      .from("admission_forms")
      .update({
        test_date: selectedDate.toISOString().split("T")[0],
        test_time: selectedTime,
        status: "Test Slot Booked"
      })
      .eq("user_id", user?.id);

    setSubmitting(false);

    if (updateErr) {
      setError("Could not save your test slot. Please try again.");
      return;
    }

    toast({
      title: "Exam Slot Chosen",
      description: `You have selected ${format(selectedDate, "PPP")} at ${selectedTime}`,
    });
    setTimeout(() => navigate("/pay-fees", { replace: true }), 1000);
  };

  return (
    <div className="min-h-screen bg-white font-cairo flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Book Your Admission Test Slot</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full max-w-xs">
        <div className="w-full">
          <label className="font-semibold text-green-700 text-left block mb-1">Choose Date:</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${!selectedDate && "text-muted-foreground"}`}
                type="button"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="p-3 pointer-events-auto"
                disabled={date =>
                  date < new Date(new Date().setHours(0,0,0,0))
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full">
          <label className="font-semibold text-green-700 text-left block mb-1">Choose Time:</label>
          <input
            type="time"
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded text-lg w-full"
            required
          />
        </div>
        <Button type="submit" disabled={submitting} className="rounded-lg bg-green-700 text-white font-bold mt-2 w-full">
          {submitting ? "Saving..." : "Confirm Slot"}
        </Button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      <div className="text-gray-500 mt-6 text-sm max-w-xs">
        This test slot will be reflected in your Outlook calendar soon.
      </div>
    </div>
  );
};

export default EnterOutlook;
