import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../actions/eventsAction";
import Event from "../components/Event";

const EventScreen = () => {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.allEvents);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  console.log(events);
  return (
    <div>
      <div class="events my-4">
        <div class="container">
          {events.map((event) => (
            <Event key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventScreen;
