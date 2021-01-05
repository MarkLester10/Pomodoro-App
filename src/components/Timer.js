import React, { useContext, useState, useEffect } from "react";
import Duration from "luxon/src/duration.js";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import LaptopChromebookOutlinedIcon from "@material-ui/icons/LaptopChromebook";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfast";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotel";
import Button from "@material-ui/core/Button";
import PauseIcon from "@material-ui/icons/Pause";
import { longBreakContext, breakContext, workContext } from "./Customizer";

import endedAudio from "../Audio/alert_simple.wav";
import startedAudio from "../Audio/notification_simple-01.wav";
const Timer = () => {
  // State
  const [timerLength, setTimerLength] = useState(24);
  const [seconds, setSeconds] = useState(59);
  const [timerOn, setTimerOn] = useState(false);
  const [timerDone, setTimerDone] = useState(true);
  const [sessionType, setSessionType] = useState("Work");
  const [sessionNumber, setSessionNumber] = useState(0);

  //Timer
  const startedSound = new Audio(startedAudio);
  const endedSound = new Audio(endedAudio);

  //Data from context api
  const longBreakLength = useContext(longBreakContext);
  const breakLength = useContext(breakContext);
  const workLength = useContext(workContext);

  //Play and Pause Timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);

    if (seconds === 0) {
      setSeconds((seconds) => seconds + 59);
      setTimerLength((timerLength) => timerLength - 1);
    }

    //Switch Event Mode Handler
    if (timerLength === 0 && seconds === 0) {
      setTimerOn(false);
      setTimerDone(true);
      setSessionType((prevType) => {
        if (prevType === "Work") return "Break";
        if (prevType === "Break") return "Work";
        if (prevType === "Long Break") return "Work";
      });
    }

    if (timerOn) {
      setTimerDone(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerOn, seconds, timerLength]);

  //Switching Timers: From Work Mode to Break Mode
  useEffect(() => {
    if (sessionType === "Work") {
      setTimerLength(workLength);
    }
  }, [sessionType, workLength]);

  useEffect(() => {
    if (sessionType === "Break") {
      setTimerLength(breakLength);
    }
  }, [breakLength, sessionType]);

  useEffect(() => {
    if (sessionType === "Long Break") {
      setTimerLength(longBreakLength);
    }
  }, [longBreakLength, sessionType]);

  //Switching Timers: From Break Mode to Long Break Mode
  useEffect(() => {
    if (sessionType === "Work" && timerDone) {
      setSessionNumber((prevNumber) => prevNumber + 1);
    }
    if (timerDone) {
      endedSound.play();
    }
  }, [sessionType, timerDone]);

  //Long Break Handler

  useEffect(() => {
    if (sessionNumber > 4) {
      setSessionType("Long Break");
      setSessionNumber(0);
    }
  }, [sessionNumber]);

  return (
    <div
      className="flex items-center
    flex-col"
    >
      <p className="text-6xl text-center mt-8">
        {Duration.fromObject({
          minutes: timerLength,
          seconds: seconds,
        }).toFormat("mm:ss")}
      </p>
      <p className="uppercase border text-lg my-6 py-4 px-2">
        Session Number: {sessionNumber}
      </p>
      <div className="mb-6 animate-bounce">
        {sessionType === "Break" && (
          <FreeBreakfastOutlinedIcon
            style={{ color: "white", fontSize: "50px" }}
          />
        )}
        {sessionType === "Work" && (
          <LaptopChromebookOutlinedIcon
            style={{ color: "#69f0ae", fontSize: "50px" }}
          />
        )}
        {sessionType === "Long Break" && (
          <LocalHotelOutlinedIcon
            style={{ color: "white", fontSize: "50px" }}
          />
        )}
        <span className="ml-2 text-gray-400 text-xl">{sessionType} Mode</span>
      </div>
      <Button
        className="text-white"
        color="default"
        variant="contained"
        size="large"
        startIcon={timerOn ? <PauseIcon /> : <PlayArrowIcon />}
        onClick={() => {
          setTimerOn(!timerOn);
          startedSound.play();
        }}
      >
        {timerOn ? "Pause" : "Run"}
      </Button>
    </div>
  );
};

export default Timer;
