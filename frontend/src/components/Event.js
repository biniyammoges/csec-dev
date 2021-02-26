import React from "react";

const Event = ({ event }) => {
  return (
    <div class="list-group">
      <span class="list-group-title">
        <i className="fas fa-flag"></i> Event
      </span>
      <div class="list-group-body grid">
        <div class="event-image">
          <img src={event.photo} alt={event.title} />
        </div>
        <div class="event-info">
          <span>
            <strong>{event.title} </strong>
          </span>
          <span>{event.description}</span>
          <span>
            <strong>
              <i class="fas fa-clock"></i>
            </strong>{" "}
            - {event.startDate}
          </span>
          <span>
            <strong>
              <i class="fas fa-thumbtack"></i>
            </strong>{" "}
            {event.location}
          </span>
          <div className="event-owner flex my-1 ">
            <strong>Event by </strong> -
            <div className="event-owner-info flex">
              <img src={event.user.photo} alt={event.title} />
              <p>{event.user.fullName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
