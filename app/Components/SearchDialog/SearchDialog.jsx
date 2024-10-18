"use client";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { commandIcon } from "@/app/utils/icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";

function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = useState(0);

  const getClickedCoords = (lat, lon) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <div className="search-btn">
      <Dialog>
        {/* Removed 'asChild' prop */}
        <DialogTrigger>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
          >
            <p className="text-sm text-muted-foreground">Search Here...</p>
            <div className="command dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
              {commandIcon}
              <span className="text-[9px]">F</span>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder="Type a command or search..."
            />
            <ul className="px-3 pb-2">
              <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

              {/* Added a conditional check to avoid displaying 'No Results' when geoCodedList is empty */}
              {geoCodedList?.length === 0 ? (
                <p className="p-2 text-sm">No Results</p>
              ) : (
                geoCodedList?.map((item, index) => {
                  const { country, state, name, lat, lon } = item;
                  return (
                    <li
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`py-3 px-2 text-sm rounded-sm cursor-default ${
                        hoveredIndex === index ? "bg-accent" : ""
                      }`}
                      onClick={() => {
                        getClickedCoords(lat, lon);
                      }}
                    >
                      <p className="text">
                        {name}, {state && state + ","} {country}
                      </p>
                    </li>
                  );
                })
              )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchDialog;
