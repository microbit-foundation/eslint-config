/**
 * (c) 2026, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import prettier from "eslint-config-prettier/flat";
import base from "./lib/base.js";
import react from "./lib/react.js";

export default [...base, ...react, prettier];
