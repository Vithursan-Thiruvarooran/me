import * as React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {
    opacity: 1,
    scale: 1,
  },
  visible: {
    opacity: 0,
    scale: 0,
    transition: {
      delay: 4.4,
      duration: 0.3,
    },
  },
};

const svg = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 0.5,
    transition: {
      when: "afterChildren",
      duration: 0.1,
      delay: 3,
      staggerChildren: 0.2,
    },
  },
};

const path = (strokeDashoffset) => ({
  hidden: { strokeDashoffset },
  visible: {
    strokeDashoffset: 0,
  },
});

const rectProps = {
  variants: path(925),
  transition: {
    duration: 1.2,
  },
};

const Vithursan = (props) => {

  const pathProps = {
    variants: path(200),
    transition: {
      duration: 0.7,
    },
    stroke: props.color
  };

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 406.5 110.9"
          variants={svg}
          initial="hidden"
          animate="visible"
          {...props}
        >
          <clipPath id="v">
            <path d="M 27 31 L 45 79 L 51 79 L 68 31 L 62 31 L 48 71 L 34 31 Z" />
          </clipPath>
          <clipPath id="i">
            <path d="M 75 44 L 75 79 L 81 79 L 81 44 L 75 44 M 75 31 L 75 37 L 81 37 L 81 31 L 75 31" />
          </clipPath>
          <clipPath id="t">
            <path
              //id="prefix__e"
              d="M 94 35 L 94 44 L 88 44 L 88 49 L 94 49 L 93.853 70.493 C 94.083 76.557 99.275 82.197 109.047 77.261 L 108.993 72.559 C 101.436 75.875 100 72 100 70 L 100 49 L 109 49 L 109 44 L 100 44 L 100 35 Z"
            />
          </clipPath>
          <clipPath id="h">
            <path d="M 117 28 L 117 79 L 123 79 L 123 55 C 132 44 138 49 139 54 L 139 79 L 145 79 L 145.29 53.321 C 145 46 135 37 123 48 L 123 28 L 117 28" />
          </clipPath>
          <clipPath id="u">
            <path d="M 156.565 44.004 V 65.997 C 156.654 83.864 174.693 80.507 179.273 73.447 L 179.343 79.098 L 185 79 L 185 44 L 179 44 L 178.949 67.338 C 169.146 79.969 162.563 71.913 162.384 64.885 L 162.205 44.027 Z" />
          </clipPath>
          <clipPath id="r">
            <path d="M 196 44 L 196 79 L 201 79 L 201 56 C 206 50 208 47 216 50 L 216 45 C 209 42 206 44 201 49 L 201 44 L 196 44" />
          </clipPath>
          <clipPath id="s">
            <path d="M 241 46 C 234 41 221 42 220 53 C 220 60 227 62 231 64 C 244 68 234 80 220 71 L 220 76 C 228 83 242 79 243 70 C 243 62 238 61 234 59 C 218 54 229 42 241 51 L 241 46" />
          </clipPath>
          <clipPath id="a">
            <path d="M 251 52 L 251 47 C 265 39 276 45 276 52 L 276 79 L 271 79 L 271 75 C 259.271 84.445 249.258 76.897 249.264 69.962 C 249.081 60.51 257 58 270 58 C 271 52 268 43 251 52 M 270 63 L 263 63 C 254 63 254.5 70.681 256.913 73.066 C 262.143 77.138 268.559 72.257 270 70 L 270 63" />
          </clipPath>
          <clipPath id="n">
            <path d="M 287 44 L 287 79 L 293 79 L 293 55 C 302 44 308 49 310 55 L 310 79 L 316 79 L 316 55 C 315 42 302 39 293 49 L 293 44 L 287 44" />
          </clipPath>
          <clipPath id="T">
            <path d="M 339 31 L 339 37 L 353.5 37 L 353.5 79 L 359.5 79 L 359.5 37 L 374 37 L 374 31 Z" />
          </clipPath>
          <g fill="none" stroke="#fff" strokeWidth={15} strokeMiterlimit={10} strokeDasharray={200}>
            <motion.path
              {...pathProps}
              clipPath="url(#v)"
              d="M 27 31 L 45 79 L 51 79 L 68 31 L 62 31 L 48 71 L 34 31 Z"
            />
            <motion.path
              {...pathProps}
              clipPath="url(#i)"
              d="M 75 44 L 75 79 L 81 79 L 81 44 L 75 44 M 75 31 L 75 37 L 81 37 L 81 31 L 75 31"
            />
            <motion.path
              {...pathProps}
              clipPath="url(#t)"
              d="M 94 35 L 94 44 L 88 44 L 88 49 L 94 49 L 93.853 70.493 C 94.083 76.557 99.275 82.197 109.047 77.261 L 108.993 72.559 C 101.436 75.875 100 72 100 70 L 100 49 L 109 49 L 109 44 L 100 44 L 100 35 Z"
            />
            <motion.path
              {...pathProps}
              clipPath="url(#h)"
              d="M 117 28 L 117 79 L 123 79 L 123 55 C 132 44 138 49 139 54 L 139 79 L 145 79 L 145.29 53.321 C 145 46 135 37 123 48 L 123 28 L 117 28"
            />
            <motion.path
              {...pathProps}
              clipPath="url(#u)"
              d="M 156.565 44.004 V 65.997 C 156.654 83.864 174.693 80.507 179.273 73.447 L 179.343 79.098 L 185 79 L 185 44 L 179 44 L 178.949 67.338 C 169.146 79.969 162.563 71.913 162.384 64.885 L 162.205 44.027 Z"
            />
            <motion.path
              {...pathProps}
              clipPath="url(#r)"
              d="M 196 44 L 196 79 L 201 79 L 201 56 C 206 50 208 47 216 50 L 216 45 C 209 42 206 44 201 49 L 201 44 L 196 44"
            />
            <motion.path
              {...pathProps}
              clipPath="url(#s)"
              d="M 241 46 C 234 41 221 42 220 53 C 220 60 227 62 231 64 C 244 68 234 80 220 71 L 220 76 C 228 83 242 79 243 70 C 243 62 238 61 234 59 C 218 54 229 42 241 51 L 241 46"
            />
            <motion.path
              {...pathProps}
              clipPath="url(#a)"
              d="M 251 52 L 251 47 C 265 39 276 45 276 52 L 276 79 L 271 79 L 271 75 C 259.271 84.445 249.258 76.897 249.264 69.962 C 249.081 60.51 257 58 270 58 C 271 52 268 43 251 52 M 270 63 L 263 63 C 254 63 254.5 70.681 256.913 73.066 C 262.143 77.138 268.559 72.257 270 70 L 270 63"
            />
            <motion.path
              {...pathProps}
              clipPath="url(#n)"
              d="M 287 44 L 287 79 L 293 79 L 293 55 C 302 44 308 49 310 55 L 310 79 L 316 79 L 316 55 C 315 42 302 39 293 49 L 293 44 L 287 44"
            />
            <motion.path
              {...pathProps}
              clipPath="url(#T)"
              d="M 339 31 L 339 37 L 353.5 37 L 353.5 79 L 359.5 79 L 359.5 37 L 374 37 L 374 31 Z"
            />
          </g>
          <motion.path
            {...rectProps}
            strokeWidth={5}
            fill="none"
            stroke={props.color}
            strokeMiterlimit={10}
            d="M 12.7 14.8 h 377.3 v 83.3 H 12.7 L 12.7 12.2"
            strokeDasharray={925}
            strokeDashoffset={925}
          />
        </motion.svg>
      </motion.div>
    </>
  );
};

export default Vithursan;

//m27 31L45 79 51 79 68 31 62 31 48 71 34 31ZM75 44 75 79 81 79 81 44 75 44M75 31 75 37 81 37 81 31 75 31M94 35 94 44 88 44 88 49 94 49 93.853 70.493C94.083 76.557 99.275 82.197 109.047 77.261L108.993 72.559C101.436 75.875 100 72 100 70L100 49 109 49 109 44 100 44 100 35ZM117 28 117 79 123 79 123 55C132 44 138 49 139 54L139 79 145 79 145.29 53.321C145 46 135 37 123 48L123 28 117 28M156.565 44.004V65.997C156.654 83.864 174.693 80.507 179.273 73.447L179.343 79.098 185 79 185 44 179 44 178.949 67.338C169.146 79.969 162.563 71.913 162.384 64.885L162.205 44.027ZM196 44 196 79 201 79 201 56C206 50 208 47 216 50L216 45C209 42 206 44 201 49L201 44 196 44M241 46C234 41 221 42 220 53 220 60 227 62 231 64 244 68 234 80 220 71L220 76C228 83 242 79 243 70 243 62 238 61 234 59 218 54 229 42 241 51L241 46M251 52 251 47C265 39 276 45 276 52L276 79 271 79 271 75C259.271 84.445 249.258 76.897 249.264 69.962 249.081 60.51 257 58 270 58 271 52 268 43 251 52M270 63 263 63C254 63 254.5 70.681 256.913 73.066 262.143 77.138 268.559 72.257 270 70L270 63M287 44 287 79 293 79 293 55C302 44 308 49 310 55L310 79 316 79 316 55C315 42 302 39 293 49L293 44 287 44M339 31 339 37 353 37 353 79 360 79 360 37 374 37 374 31Z