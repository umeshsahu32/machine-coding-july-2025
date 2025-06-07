import React, { Fragment } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout.jsx";
import {
  Accordion,
  CountdownTimer,
  CryptoConverter,
  Debounce,
  FilterProduct,
  FormValidation,
  GridLight,
  InfiniteScroll,
  JobBoard,
  LikeButton,
  MemoryGame,
  MultipleTabs,
  NestedComments,
  OTPLogin,
  PasswordGenerator,
  ProgressBar,
  SelectableGrid,
  StarRating,
  TaskManager,
  TicTacToe,
  TransferList,
  Stepper,
  CurrencyConverter,
  MultiSelectPills,
  Pagination,
  ModalOverlay,
} from "./routes/routes.jsx";
import { Suspense } from "react";
import ScrollToTop from "./routes/ScrollToTop.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Fragment>
        <ScrollToTop />
        <Layout />
      </Fragment>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <App />
          </Suspense>
        ),
      },
      {
        path: "accordion",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Accordion />
          </Suspense>
        ),
      },
      {
        path: "countdown-timer",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <CountdownTimer />
          </Suspense>
        ),
      },
      {
        path: "crypto-converter",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <CryptoConverter />
          </Suspense>
        ),
      },
      {
        path: "debounce",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Debounce />
          </Suspense>
        ),
      },
      {
        path: "Filter-product",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <FilterProduct />
          </Suspense>
        ),
      },
      {
        path: "form-validation",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <FormValidation />
          </Suspense>
        ),
      },
      {
        path: "grid-light",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <GridLight />
          </Suspense>
        ),
      },
      {
        path: "infinite-scroll",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <InfiniteScroll />
          </Suspense>
        ),
      },
      {
        path: "job-board",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <JobBoard />
          </Suspense>
        ),
      },
      {
        path: "like-button",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <LikeButton />
          </Suspense>
        ),
      },
      {
        path: "memory-game",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MemoryGame />
          </Suspense>
        ),
      },
      {
        path: "multiple-tabs",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MultipleTabs />
          </Suspense>
        ),
      },
      {
        path: "nested-comments",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NestedComments />
          </Suspense>
        ),
      },
      {
        path: "otp-login",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <OTPLogin />
          </Suspense>
        ),
      },
      {
        path: "password-generator",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <PasswordGenerator />
          </Suspense>
        ),
      },
      {
        path: "progress-bar",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProgressBar />
          </Suspense>
        ),
      },
      {
        path: "selectable-grid",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SelectableGrid />
          </Suspense>
        ),
      },

      {
        path: "star-rating",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <StarRating />
          </Suspense>
        ),
      },
      {
        path: "task-manager",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TaskManager />
          </Suspense>
        ),
      },
      {
        path: "tic-tac-toe",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TicTacToe />
          </Suspense>
        ),
      },
      {
        path: "transfer-list",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TransferList />
          </Suspense>
        ),
      },
      {
        path: "currency-converter",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <CurrencyConverter />
          </Suspense>
        ),
      },
      {
        path: "stepper",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Stepper />
          </Suspense>
        ),
      },
      {
        path: "multi-select-pills",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MultiSelectPills />
          </Suspense>
        ),
      },
      {
        path: "pagination",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Pagination />
          </Suspense>
        ),
      },
      {
        path: "modal-overlay",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ModalOverlay />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
