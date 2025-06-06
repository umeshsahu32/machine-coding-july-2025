import React, { useState, useEffect, Fragment, useMemo } from "react";

const Tabs = (props) => {
  const [tabsHeaders, setTabsHeaders] = useState([]);
  const [contentMap, setContentMap] = useState({});
  const [disabledTabs, setDisabledTabs] = useState(new Set());
  const [active, setActive] = useState("");

  const { children } = props;

  // Memoize tab data extraction to avoid unnecessary re-computation
  const tabData = useMemo(() => {
    const headers = [];
    const map = {};
    const disabled = new Set();

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;

      const { title, disabled: isDisabled } = element.props;

      if (!title) {
        console.warn("Tab element missing title prop");
        return;
      }

      headers.push(title);
      map[title] = element.props.children;

      if (isDisabled) {
        disabled.add(title);
      }
    });

    return { headers, map, disabled };
  }, [children]);

  useEffect(() => {
    const { headers, map, disabled } = tabData;

    setTabsHeaders(headers);
    setContentMap(map);
    setDisabledTabs(disabled);

    // Set active tab to first non-disabled tab
    const firstEnabledTab = headers.find((header) => !disabled.has(header));
    if (firstEnabledTab) {
      setActive(firstEnabledTab);
    }
  }, [tabData]);

  const changeTab = (header) => {
    // Prevent changing to disabled tab
    if (disabledTabs.has(header)) {
      return;
    }
    setActive(header);
  };

  const getTabButtonClass = (header) => {
    const baseClass =
      "m-2 px-4 py-2 rounded-lg cursor-pointer border border-gray-400 mb-5 transition-all duration-200";

    if (disabledTabs.has(header)) {
      return `${baseClass} bg-gray-100 text-gray-400 cursor-not-allowed opacity-50`;
    }

    if (active === header) {
      return `${baseClass} bg-gray-800 text-white shadow-lg`;
    }

    return `${baseClass} bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-500`;
  };

  return (
    <Fragment>
      <div className="flex flex-wrap justify-center">
        {tabsHeaders.map((header) => (
          <button
            key={header}
            className={getTabButtonClass(header)}
            onClick={() => changeTab(header)}
            disabled={disabledTabs.has(header)}
            aria-selected={active === header}
            role="tab"
          >
            {header}
            {disabledTabs.has(header) && (
              <span className="ml-2 text-xs">(Disabled)</span>
            )}
          </button>
        ))}
      </div>

      {/* Render only active tab content */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50 min-h-[200px]">
        {active && contentMap[active] ? (
          <div className="text-lg text-center" role="tabpanel">
            {contentMap[active]}
          </div>
        ) : (
          <div className="text-center text-gray-500">No content available</div>
        )}
      </div>
    </Fragment>
  );
};

const MultipleTabs = () => {
  return (
    <div className="flex justify-center items-center flex-col p-8">
      <h1 className="text-4xl font-bold text-rose-700 mb-10">
        Enhanced Tabs with Disabled Feature
      </h1>

      <div className="w-full max-w-4xl">
        <Tabs>
          <div title="Home">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Welcome to Home
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This is the home tab content. It contains information about our
              main page and provides an overview of what users can expect to
              find here.
            </p>
          </div>

          <div title="About">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              About Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Learn more about our company, mission, and the team behind this
              project. We are committed to providing excellent user experiences.
            </p>
          </div>

          <div title="Services" disabled>
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">
              Our Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This tab is currently disabled. Services information will be
              available soon.
            </p>
          </div>

          <div title="Contact">
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">
              Contact Information
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>📧 Email: contact@example.com</p>
              <p>📞 Phone: +1 (555) 123-4567</p>
              <p>📍 Address: 123 Main St, City, State 12345</p>
            </div>
          </div>

          <div title="Settings" disabled>
            <h2 className="text-2xl font-semibold mb-4 text-red-600">
              Settings
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Settings panel is currently under maintenance and will be
              available shortly.
            </p>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default MultipleTabs;
