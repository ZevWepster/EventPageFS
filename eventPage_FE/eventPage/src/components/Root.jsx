import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));

    // Fetch events
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = typeof query === "string" ? query.toLowerCase() : "";

    if (!lowerCaseQuery) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredEvents(filtered);
    }
  };

  const handleFilter = (selectedCategoryId) => {
    if (!selectedCategoryId) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) =>
          event.categories &&
          event.categories.some((cat) => cat.id === selectedCategoryId)
      );
      setFilteredEvents(filtered);
    }
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setFilteredEvents((prev) => [...prev, newEvent]);
  };

  return (
    <Box>
      <Navigation
        onAddEvent={handleAddEvent}
        onSearch={handleSearch}
        onFilter={handleFilter}
        categories={categories}
        events={events}
      />
      <Outlet context={{ events, filteredEvents, categories }} />
    </Box>
  );
};
