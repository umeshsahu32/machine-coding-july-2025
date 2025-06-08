import React, { Fragment } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout.jsx";
import {
  Accordion,
  ChipsInput,
  FolderStructure,
  NestedCheckbox,
  CountdownTimer,
  CryptoConverter,
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
  ImageCarousel,
  MultiStepForm,
  AutoSuggestionSearch,
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
        path: "auto-suggestion-search",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <AutoSuggestionSearch />
          </Suspense>
        ),
      },
      {
        path: "chips-input",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ChipsInput />
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
        path: "currency-converter",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <CurrencyConverter />
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
        path: "folder-structure",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <FolderStructure />
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
        path: "image-carousel",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ImageCarousel />
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
        path: "modal-overlay",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ModalOverlay />
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
        path: "multi-select-pills",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MultiSelectPills />
          </Suspense>
        ),
      },
      {
        path: "multi-step-form",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MultiStepForm />
          </Suspense>
        ),
      },
      {
        path: "nested-checkbox",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NestedCheckbox />
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
        path: "pagination",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Pagination />
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
        path: "stepper",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Stepper />
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
