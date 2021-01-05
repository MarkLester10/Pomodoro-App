import React, { createContext, useState } from "react";
import Button from "@material-ui/core/Button";
import LaptopChromebookOutlinedIcon from "@material-ui/icons/LaptopChromebook";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfast";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotel";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export const breakContext = createContext();
export const workContext = createContext();
export const longBreakContext = createContext();

const Customizer = (props) => {
  const [breakLength, setBreakLength] = useState(5);
  const [workLength, setWorkLength] = useState(25);
  const [longBreakLength, setLongBreakLength] = useState(15);

  return (
    <>
      <workContext.Provider value={workLength - 1}>
        <breakContext.Provider value={breakLength - 1}>
          <longBreakContext.Provider value={longBreakLength - 1}>
            {props.children}
          </longBreakContext.Provider>
        </breakContext.Provider>
      </workContext.Provider>
      <div className="w-full md:w-1/2 mx-auto mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
        {/* Work Length */}
        <div>
          <p className="space-x-1 py-6 text-lg">
            <LaptopChromebookOutlinedIcon />
            <span> Work: {workLength}</span>
          </p>
          <div className="space-x-2">
            <Button
              color="secondary"
              variant="contained"
              size="small"
              startIcon={<RemoveIcon />}
              onClick={() =>
                setWorkLength((prevLength) =>
                  prevLength === 1 ? 1 : prevLength - 1
                )
              }
            ></Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setWorkLength(workLength + 1)}
            ></Button>
          </div>
        </div>

        {/* Break length */}
        <div>
          <p className="space-x-1 py-6 text-lg">
            <FreeBreakfastOutlinedIcon />
            <span> Break: {breakLength}</span>
          </p>
          <div className="space-x-2">
            <Button
              color="secondary"
              variant="contained"
              size="small"
              startIcon={<RemoveIcon />}
              onClick={() =>
                setBreakLength((prevLength) =>
                  prevLength === 1 ? 1 : prevLength - 1
                )
              }
            ></Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setBreakLength(breakLength + 1)}
            ></Button>
          </div>
        </div>

        {/* Long break length */}
        <div>
          <p className="space-x-1 py-6 text-lg">
            <LocalHotelOutlinedIcon />
            <span> Long Break: {longBreakLength}</span>
          </p>
          <div className="space-x-2">
            <Button
              color="secondary"
              variant="contained"
              size="small"
              startIcon={<RemoveIcon />}
              onClick={() =>
                setLongBreakLength((prevLength) =>
                  prevLength === 1 ? 1 : prevLength - 1
                )
              }
            ></Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setLongBreakLength(longBreakLength + 1)}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customizer;
