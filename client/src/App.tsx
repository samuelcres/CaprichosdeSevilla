import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/context/AppContext";
import ApartmentPage from "@/pages/ApartmentPage";
import MenuPage from "@/pages/MenuPage";
import TransportPageWrapper from "@/pages/TransportPageWrapper";
import CheckinPageWrapper from "@/pages/CheckinPageWrapper";
import WifiPageWrapper from "@/pages/WifiPageWrapper";
import TourismPageWrapper from "@/pages/TourismPageWrapper";
import ContactPageWrapper from "@/pages/ContactPageWrapper";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={ApartmentPage} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/transport" component={TransportPageWrapper} />
      <Route path="/checkin" component={CheckinPageWrapper} />
      <Route path="/wifi" component={WifiPageWrapper} />
      <Route path="/tourism" component={TourismPageWrapper} />
      <Route path="/contact" component={ContactPageWrapper} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
