import { useState, useRef, useEffect } from "react";

const InPageNavigation = ({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,children,
  activeTab
  
}) => {
  const activeTabLineRef = useRef();


  const changePageState = (btn, i) => {
    const { offsetWidth, offsetLeft } = btn;
    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";
    setInPageIndex(i);
  };

  useEffect(() => {
    changePageState(activeTab.current, defaultActiveIndex);
  }, [defaultActiveIndex]);

  const [inPageIndex, setInPageIndex] = useState(defaultActiveIndex);

  

  return (
    <>
      <div className="relative mx-10 sm:mx-16 mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => (
          <button
            ref={i === defaultActiveIndex ? activeTab : null}
            onClick={(e) => changePageState(e.target, i)}
            className={`p-4 px-5 capitalize ${
              inPageIndex === i ? "text-black" : "text-gray-600"
            } ${defaultHidden.includes(route) ? "md:hidden" : ""}`}
            key={i}
          >
            {route}
          </button>
        ))}

        <hr
          ref={activeTabLineRef}
          className="absolute bottom-0 border-black duration-300"
          style={{ height: "2px" }}
        />
      </div>
     
     {Array.isArray?  children[inPageIndex]:children}
    </>
  );
};

export default InPageNavigation;
