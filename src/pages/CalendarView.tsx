
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import "./CalendarView.css";


interface Meeting {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function CalendarView() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get<Meeting[]>("http://localhost:3001/meetings");
        const mapped = res.data
          .filter((m) => m.date && m.startTime && m.endTime)
          .map((m) => ({
            id: m.id,
            title: m.title || '(Bez tytułu)',
            start: `${m.date}T${m.startTime}`,
            end: `${m.date}T${m.endTime}`,
          }));
        setEvents(mapped);
      } catch (err) {
        console.error("Błąd ładowania spotkań do kalendarza:", err);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        events={events}
        height="auto"
        nowIndicator={true}
        scrollTime="00:00:00"
      />
    </div>
  );
}