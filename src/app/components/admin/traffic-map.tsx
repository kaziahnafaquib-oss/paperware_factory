import { memo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Tooltip as ReactTooltip } from "react-tooltip";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const colorScale = scaleLinear<string>()
  .domain([0, 15000])
  .range(["#27272a", "#fabf37"]);

interface TrafficMapProps {
  visitorsData: any[];
}

export const TrafficMap = memo(({ visitorsData }: TrafficMapProps) => {
  const [content, setContent] = useState("");

  return (
    <div className="flex-1 w-full h-full rounded-3xl overflow-hidden bg-zinc-900/30 border border-white/5 relative">
       <ComposableMap
          projectionConfig={{
            scale: 140,
            center: [0, 0]
          }}
          width={800}
          height={450}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const cur = visitorsData.find((s) => s.code === geo.id || s.code === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={cur ? colorScale(cur.value) : "#18181b"}
                      stroke="#000"
                      strokeWidth={0.5}
                      onMouseEnter={() => {
                        const name = geo.properties.name || geo.properties.NAME;
                        const val = cur ? cur.value : 0;
                        setContent(`${name}: ${val.toLocaleString()} visitors`);
                      }}
                      onMouseLeave={() => {
                        setContent("");
                      }}
                      style={{
                        default: { outline: "none", transition: "all 250ms" },
                        hover: { fill: "#fabf37", outline: "none", cursor: "pointer" },
                        pressed: { fill: "#E42", outline: "none" },
                      }}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={content}
                    />
                  );
                })
              }
            </Geographies>
            {visitorsData.map(({ name, coordinates, value }) => (
              <Marker key={name} coordinates={coordinates as [number, number]}>
                <circle r={2} fill="#fff" stroke="#fabf37" strokeWidth={1} />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{ fontFamily: "system-ui", fill: "#fff", fontSize: "8px", fontWeight: "bold", textTransform: "uppercase" }}
                >
                  {value > 5000 ? name : ""}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip 
          id="my-tooltip" 
          border="1px solid rgba(255,255,255,0.1)"
          style={{ backgroundColor: "#000", color: "#fabf37", fontWeight: "bold", textTransform: "uppercase", fontSize: "10px", borderRadius: "8px" }} 
        />
    </div>
  );
});