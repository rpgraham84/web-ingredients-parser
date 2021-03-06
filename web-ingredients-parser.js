(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

"use strict";

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { start: peg$parsestart },
      peg$startRuleFunction  = peg$parsestart,

      peg$c0 = /^[\n]/,
      peg$c1 = peg$classExpectation(["\n"], false, false),
      peg$c2 = function(amount, container_rule, unit, preposition, ingredient) {
          var result = {
            amount: amount,
            container: container_rule,
            ingredient: ingredient,
            unit: unit,
          };

          for(var i in result) {
            if(result[i] === null || result[i] === undefined) {
              delete result[i];
            }
          }

          return result;
        },
      peg$c3 = function(amount, unit) {
          return { amount: amount, unit: unit };
        },
      peg$c4 = "(",
      peg$c5 = peg$literalExpectation("(", false),
      peg$c6 = "{",
      peg$c7 = peg$literalExpectation("{", false),
      peg$c8 = "[",
      peg$c9 = peg$literalExpectation("[", false),
      peg$c10 = "<",
      peg$c11 = peg$literalExpectation("<", false),
      peg$c12 = ")",
      peg$c13 = peg$literalExpectation(")", false),
      peg$c14 = "}",
      peg$c15 = peg$literalExpectation("}", false),
      peg$c16 = "]",
      peg$c17 = peg$literalExpectation("]", false),
      peg$c18 = ">",
      peg$c19 = peg$literalExpectation(">", false),
      peg$c20 = " ",
      peg$c21 = peg$literalExpectation(" ", false),
      peg$c22 = /^[\t]/,
      peg$c23 = peg$classExpectation(["\t"], false, false),
      peg$c24 = "of",
      peg$c25 = peg$literalExpectation("of", true),
      peg$c26 = "an",
      peg$c27 = peg$literalExpectation("an", true),
      peg$c28 = "a",
      peg$c29 = peg$literalExpectation("a", true),
      peg$c30 = peg$anyExpectation(),
      peg$c31 = /^[,]/,
      peg$c32 = peg$classExpectation([","], false, false),
      peg$c33 = function(letters) { return letters.join(''); },
      peg$c34 = /^[.]/,
      peg$c35 = peg$classExpectation(["."], false, false),
      peg$c36 = "one",
      peg$c37 = peg$literalExpectation("one", true),
      peg$c38 = "two",
      peg$c39 = peg$literalExpectation("two", true),
      peg$c40 = "three",
      peg$c41 = peg$literalExpectation("three", true),
      peg$c42 = "four",
      peg$c43 = peg$literalExpectation("four", true),
      peg$c44 = "five",
      peg$c45 = peg$literalExpectation("five", true),
      peg$c46 = "six",
      peg$c47 = peg$literalExpectation("six", true),
      peg$c48 = "seven",
      peg$c49 = peg$literalExpectation("seven", true),
      peg$c50 = "eight",
      peg$c51 = peg$literalExpectation("eight", true),
      peg$c52 = "nine",
      peg$c53 = peg$literalExpectation("nine", true),
      peg$c54 = "ten",
      peg$c55 = peg$literalExpectation("ten", true),
      peg$c56 = "eleven",
      peg$c57 = peg$literalExpectation("eleven", true),
      peg$c58 = "twelve",
      peg$c59 = peg$literalExpectation("twelve", true),
      peg$c60 = "couple",
      peg$c61 = peg$literalExpectation("couple", true),
      peg$c62 = "few",
      peg$c63 = peg$literalExpectation("few", true),
      peg$c64 = /^[\/]/,
      peg$c65 = peg$classExpectation(["/"], false, false),
      peg$c66 = /^[0-9]/,
      peg$c67 = peg$classExpectation([["0", "9"]], false, false),
      peg$c68 = function(digits) { return digits.join(''); },
      peg$c69 = /^[a-zA-Z]/,
      peg$c70 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
      peg$c71 = "cups",
      peg$c72 = peg$literalExpectation("cups", true),
      peg$c73 = "cup",
      peg$c74 = peg$literalExpectation("cup", true),
      peg$c75 = "c.",
      peg$c76 = peg$literalExpectation("c.", true),
      peg$c77 = "c",
      peg$c78 = peg$literalExpectation("c", true),
      peg$c79 = "fluid",
      peg$c80 = peg$literalExpectation("fluid", true),
      peg$c81 = "fl",
      peg$c82 = peg$literalExpectation("fl", true),
      peg$c83 = ".",
      peg$c84 = peg$literalExpectation(".", false),
      peg$c85 = "gallons",
      peg$c86 = peg$literalExpectation("gallons", true),
      peg$c87 = "gallon",
      peg$c88 = peg$literalExpectation("gallon", true),
      peg$c89 = "gal.",
      peg$c90 = peg$literalExpectation("gal.", true),
      peg$c91 = "gal",
      peg$c92 = peg$literalExpectation("gal", true),
      peg$c93 = "ounces",
      peg$c94 = peg$literalExpectation("ounces", true),
      peg$c95 = "ounce",
      peg$c96 = peg$literalExpectation("ounce", true),
      peg$c97 = "oz.",
      peg$c98 = peg$literalExpectation("oz.", true),
      peg$c99 = "oz",
      peg$c100 = peg$literalExpectation("oz", true),
      peg$c101 = "pints",
      peg$c102 = peg$literalExpectation("pints", true),
      peg$c103 = "pint",
      peg$c104 = peg$literalExpectation("pint", true),
      peg$c105 = "pt.",
      peg$c106 = peg$literalExpectation("pt.", true),
      peg$c107 = "pt",
      peg$c108 = peg$literalExpectation("pt", true),
      peg$c109 = "pounds",
      peg$c110 = peg$literalExpectation("pounds", true),
      peg$c111 = "pound",
      peg$c112 = peg$literalExpectation("pound", true),
      peg$c113 = "lbs.",
      peg$c114 = peg$literalExpectation("lbs.", true),
      peg$c115 = "lbs",
      peg$c116 = peg$literalExpectation("lbs", true),
      peg$c117 = "lb.",
      peg$c118 = peg$literalExpectation("lb.", true),
      peg$c119 = "lb",
      peg$c120 = peg$literalExpectation("lb", true),
      peg$c121 = "quarts",
      peg$c122 = peg$literalExpectation("quarts", true),
      peg$c123 = "quart",
      peg$c124 = peg$literalExpectation("quart", true),
      peg$c125 = "qts.",
      peg$c126 = peg$literalExpectation("qts.", true),
      peg$c127 = "qts",
      peg$c128 = peg$literalExpectation("qts", true),
      peg$c129 = "qt.",
      peg$c130 = peg$literalExpectation("qt.", true),
      peg$c131 = "qt",
      peg$c132 = peg$literalExpectation("qt", true),
      peg$c133 = "tablespoons",
      peg$c134 = peg$literalExpectation("tablespoons", true),
      peg$c135 = "tablespoon",
      peg$c136 = peg$literalExpectation("tablespoon", true),
      peg$c137 = "tbsp.",
      peg$c138 = peg$literalExpectation("tbsp.", true),
      peg$c139 = "tbsp",
      peg$c140 = peg$literalExpectation("tbsp", true),
      peg$c141 = "tbs.",
      peg$c142 = peg$literalExpectation("tbs.", true),
      peg$c143 = "tbs",
      peg$c144 = peg$literalExpectation("tbs", true),
      peg$c145 = "T.",
      peg$c146 = peg$literalExpectation("T.", false),
      peg$c147 = "T",
      peg$c148 = peg$literalExpectation("T", false),
      peg$c149 = "teaspoons",
      peg$c150 = peg$literalExpectation("teaspoons", true),
      peg$c151 = "teaspoon",
      peg$c152 = peg$literalExpectation("teaspoon", true),
      peg$c153 = "tsp.",
      peg$c154 = peg$literalExpectation("tsp.", true),
      peg$c155 = "tsp",
      peg$c156 = peg$literalExpectation("tsp", true),
      peg$c157 = "t.",
      peg$c158 = peg$literalExpectation("t.", false),
      peg$c159 = "t",
      peg$c160 = peg$literalExpectation("t", false),
      peg$c161 = "grams",
      peg$c162 = peg$literalExpectation("grams", true),
      peg$c163 = "gram",
      peg$c164 = peg$literalExpectation("gram", true),
      peg$c165 = "gr.",
      peg$c166 = peg$literalExpectation("gr.", true),
      peg$c167 = "gr",
      peg$c168 = peg$literalExpectation("gr", true),
      peg$c169 = "g.",
      peg$c170 = peg$literalExpectation("g.", true),
      peg$c171 = "g",
      peg$c172 = peg$literalExpectation("g", true),
      peg$c173 = "kilograms",
      peg$c174 = peg$literalExpectation("kilograms", true),
      peg$c175 = "kilogram",
      peg$c176 = peg$literalExpectation("kilogram", true),
      peg$c177 = "kg.",
      peg$c178 = peg$literalExpectation("kg.", true),
      peg$c179 = "kg",
      peg$c180 = peg$literalExpectation("kg", true),
      peg$c181 = "liters",
      peg$c182 = peg$literalExpectation("liters", true),
      peg$c183 = "liter",
      peg$c184 = peg$literalExpectation("liter", true),
      peg$c185 = "l.",
      peg$c186 = peg$literalExpectation("l.", true),
      peg$c187 = "l",
      peg$c188 = peg$literalExpectation("l", true),
      peg$c189 = "milligrams",
      peg$c190 = peg$literalExpectation("milligrams", true),
      peg$c191 = "milligram",
      peg$c192 = peg$literalExpectation("milligram", true),
      peg$c193 = "mg.",
      peg$c194 = peg$literalExpectation("mg.", true),
      peg$c195 = "mg",
      peg$c196 = peg$literalExpectation("mg", true),
      peg$c197 = "milliliters",
      peg$c198 = peg$literalExpectation("milliliters", true),
      peg$c199 = "milliliter",
      peg$c200 = peg$literalExpectation("milliliter", true),
      peg$c201 = "ml.",
      peg$c202 = peg$literalExpectation("ml.", true),
      peg$c203 = "ml",
      peg$c204 = peg$literalExpectation("ml", true),
      peg$c205 = "centiliters",
      peg$c206 = peg$literalExpectation("centiliters", true),
      peg$c207 = "centiliter",
      peg$c208 = peg$literalExpectation("centiliter", true),
      peg$c209 = "cl.",
      peg$c210 = peg$literalExpectation("cl.", true),
      peg$c211 = "cl",
      peg$c212 = peg$literalExpectation("cl", true),
      peg$c213 = "deciliters",
      peg$c214 = peg$literalExpectation("deciliters", true),
      peg$c215 = "deciliter",
      peg$c216 = peg$literalExpectation("deciliter", true),
      peg$c217 = "dl.",
      peg$c218 = peg$literalExpectation("dl.", true),
      peg$c219 = "dl",
      peg$c220 = peg$literalExpectation("dl", true),
      peg$c221 = "bags",
      peg$c222 = peg$literalExpectation("bags", true),
      peg$c223 = "bag",
      peg$c224 = peg$literalExpectation("bag", true),
      peg$c225 = "bars",
      peg$c226 = peg$literalExpectation("bars", true),
      peg$c227 = "bar",
      peg$c228 = peg$literalExpectation("bar", true),
      peg$c229 = "bottles",
      peg$c230 = peg$literalExpectation("bottles", true),
      peg$c231 = "bottle",
      peg$c232 = peg$literalExpectation("bottle", true),
      peg$c233 = "bowls",
      peg$c234 = peg$literalExpectation("bowls", true),
      peg$c235 = "bowl",
      peg$c236 = peg$literalExpectation("bowl", true),
      peg$c237 = "breasts",
      peg$c238 = peg$literalExpectation("breasts", true),
      peg$c239 = "breast",
      peg$c240 = peg$literalExpectation("breast", true),
      peg$c241 = "bulbs",
      peg$c242 = peg$literalExpectation("bulbs", true),
      peg$c243 = "bulb",
      peg$c244 = peg$literalExpectation("bulb", true),
      peg$c245 = "buns",
      peg$c246 = peg$literalExpectation("buns", true),
      peg$c247 = "bun",
      peg$c248 = peg$literalExpectation("bun", true),
      peg$c249 = "bunches",
      peg$c250 = peg$literalExpectation("bunches", true),
      peg$c251 = "bunch",
      peg$c252 = peg$literalExpectation("bunch", true),
      peg$c253 = "cans",
      peg$c254 = peg$literalExpectation("cans", true),
      peg$c255 = "can",
      peg$c256 = peg$literalExpectation("can", true),
      peg$c257 = "cartons",
      peg$c258 = peg$literalExpectation("cartons", true),
      peg$c259 = "carton",
      peg$c260 = peg$literalExpectation("carton", true),
      peg$c261 = "cones",
      peg$c262 = peg$literalExpectation("cones", true),
      peg$c263 = "cone",
      peg$c264 = peg$literalExpectation("cone", true),
      peg$c265 = "cloves",
      peg$c266 = peg$literalExpectation("cloves", true),
      peg$c267 = "clove",
      peg$c268 = peg$literalExpectation("clove", true),
      peg$c269 = "larges",
      peg$c270 = peg$literalExpectation("larges", true),
      peg$c271 = "large",
      peg$c272 = peg$literalExpectation("large", true),
      peg$c273 = "mediums",
      peg$c274 = peg$literalExpectation("mediums", true),
      peg$c275 = "medium",
      peg$c276 = peg$literalExpectation("medium", true),
      peg$c277 = "minis",
      peg$c278 = peg$literalExpectation("minis", true),
      peg$c279 = "mini",
      peg$c280 = peg$literalExpectation("mini", true),
      peg$c281 = "smalls",
      peg$c282 = peg$literalExpectation("smalls", true),
      peg$c283 = "small",
      peg$c284 = peg$literalExpectation("small", true),
      peg$c285 = "cubes",
      peg$c286 = peg$literalExpectation("cubes", true),
      peg$c287 = "cube",
      peg$c288 = peg$literalExpectation("cube", true),
      peg$c289 = "fillets",
      peg$c290 = peg$literalExpectation("fillets", true),
      peg$c291 = "fillet",
      peg$c292 = peg$literalExpectation("fillet", true),
      peg$c293 = "heads",
      peg$c294 = peg$literalExpectation("heads", true),
      peg$c295 = "head",
      peg$c296 = peg$literalExpectation("head", true),
      peg$c297 = "jars",
      peg$c298 = peg$literalExpectation("jars", true),
      peg$c299 = "jar",
      peg$c300 = peg$literalExpectation("jar", true),
      peg$c301 = "packages",
      peg$c302 = peg$literalExpectation("packages", true),
      peg$c303 = "package",
      peg$c304 = peg$literalExpectation("package", true),
      peg$c305 = "packets",
      peg$c306 = peg$literalExpectation("packets", true),
      peg$c307 = "packet",
      peg$c308 = peg$literalExpectation("packet", true),
      peg$c309 = "packs",
      peg$c310 = peg$literalExpectation("packs", true),
      peg$c311 = "pack",
      peg$c312 = peg$literalExpectation("pack", true),
      peg$c313 = "patties",
      peg$c314 = peg$literalExpectation("patties", true),
      peg$c315 = "patty",
      peg$c316 = peg$literalExpectation("patty", true),
      peg$c317 = "pieces",
      peg$c318 = peg$literalExpectation("pieces", true),
      peg$c319 = "piece",
      peg$c320 = peg$literalExpectation("piece", true),
      peg$c321 = "portions",
      peg$c322 = peg$literalExpectation("portions", true),
      peg$c323 = "portion",
      peg$c324 = peg$literalExpectation("portion", true),
      peg$c325 = "servingses",
      peg$c326 = peg$literalExpectation("servingses", true),
      peg$c327 = "servings",
      peg$c328 = peg$literalExpectation("servings", true),
      peg$c329 = "rolls",
      peg$c330 = peg$literalExpectation("rolls", true),
      peg$c331 = "roll",
      peg$c332 = peg$literalExpectation("roll", true),
      peg$c333 = "slices",
      peg$c334 = peg$literalExpectation("slices", true),
      peg$c335 = "slice",
      peg$c336 = peg$literalExpectation("slice", true),
      peg$c337 = "handfuls",
      peg$c338 = peg$literalExpectation("handfuls", true),
      peg$c339 = "handful",
      peg$c340 = peg$literalExpectation("handful", true),
      peg$c341 = "pinches",
      peg$c342 = peg$literalExpectation("pinches", true),
      peg$c343 = "pinch",
      peg$c344 = peg$literalExpectation("pinch", true),
      peg$c345 = "touches",
      peg$c346 = peg$literalExpectation("touches", true),
      peg$c347 = "touch",
      peg$c348 = peg$literalExpectation("touch", true),
      peg$c349 = "envelopes",
      peg$c350 = peg$literalExpectation("envelopes", true),
      peg$c351 = "envelope",
      peg$c352 = peg$literalExpectation("envelope", true),
      peg$c353 = "sprigs",
      peg$c354 = peg$literalExpectation("sprigs", true),
      peg$c355 = "sprig",
      peg$c356 = peg$literalExpectation("sprig", true),
      peg$c357 = "sheets",
      peg$c358 = peg$literalExpectation("sheets", true),
      peg$c359 = "sheet",
      peg$c360 = peg$literalExpectation("sheet", true),
      peg$c361 = "splashes",
      peg$c362 = peg$literalExpectation("splashes", true),
      peg$c363 = "splash",
      peg$c364 = peg$literalExpectation("splash", true),
      peg$c365 = "dashes",
      peg$c366 = peg$literalExpectation("dashes", true),
      peg$c367 = "dash",
      peg$c368 = peg$literalExpectation("dash", true),
      peg$c369 = "units",
      peg$c370 = peg$literalExpectation("units", true),
      peg$c371 = "unit",
      peg$c372 = peg$literalExpectation("unit", true),
      peg$c373 = "containers",
      peg$c374 = peg$literalExpectation("containers", true),
      peg$c375 = "container",
      peg$c376 = peg$literalExpectation("container", true),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsestart() {
    var s0;

    s0 = peg$parseingredient_full();

    return s0;
  }

  function peg$parseingredient_full() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseamount();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsews();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsews();
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecontainer_rule();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseunit();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$parsews();
            if (s6 !== peg$FAILED) {
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$parsews();
              }
            } else {
              s5 = peg$FAILED;
            }
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsepreposition();
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parsews();
                if (s8 !== peg$FAILED) {
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsews();
                  }
                } else {
                  s7 = peg$FAILED;
                }
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsephrase();
                  if (s8 === peg$FAILED) {
                    s8 = null;
                  }
                  if (s8 !== peg$FAILED) {
                    if (peg$c0.test(input.charAt(peg$currPos))) {
                      s9 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c1); }
                    }
                    if (s9 === peg$FAILED) {
                      s9 = null;
                    }
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c2(s1, s3, s4, s6, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseamount() {
    var s0;

    s0 = peg$parsefraction();
    if (s0 === peg$FAILED) {
      s0 = peg$parsemixed_number();
      if (s0 === peg$FAILED) {
        s0 = peg$parseword_number();
        if (s0 === peg$FAILED) {
          s0 = peg$parsefloat();
          if (s0 === peg$FAILED) {
            s0 = peg$parseinteger();
            if (s0 === peg$FAILED) {
              s0 = peg$parsefew();
              if (s0 === peg$FAILED) {
                s0 = peg$parsecouple();
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsecontainer_rule() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parsecontainer_wrapper_start();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsews();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsews();
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseamount();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsews();
          if (s5 !== peg$FAILED) {
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsews();
            }
          } else {
            s4 = peg$FAILED;
          }
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseunit();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parsews();
              if (s7 !== peg$FAILED) {
                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parsews();
                }
              } else {
                s6 = peg$FAILED;
              }
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsecontainer_wrapper_end();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c3(s3, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecontainer_wrapper_start() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 40) {
      s0 = peg$c4;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c5); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 123) {
        s0 = peg$c6;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c7); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 91) {
          s0 = peg$c8;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c9); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 60) {
            s0 = peg$c10;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsecontainer_wrapper_end() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 41) {
      s0 = peg$c12;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c13); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 125) {
        s0 = peg$c14;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 93) {
          s0 = peg$c16;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s0 = peg$c18;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c19); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsews() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 32) {
      s0 = peg$c20;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c21); }
    }
    if (s0 === peg$FAILED) {
      if (peg$c22.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
    }

    return s0;
  }

  function peg$parsepreposition() {
    var s0;

    if (input.substr(peg$currPos, 2).toLowerCase() === peg$c24) {
      s0 = input.substr(peg$currPos, 2);
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c25); }
    }

    return s0;
  }

  function peg$parsearticle() {
    var s0;

    if (input.substr(peg$currPos, 2).toLowerCase() === peg$c26) {
      s0 = input.substr(peg$currPos, 2);
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c27); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 1).toLowerCase() === peg$c28) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
    }

    return s0;
  }

  function peg$parsespace() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 32) {
      s0 = peg$c20;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c21); }
    }

    return s0;
  }

  function peg$parsephrase() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (input.length > peg$currPos) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c30); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c30); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parsepunctuation() {
    var s0;

    if (peg$c31.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c32); }
    }

    return s0;
  }

  function peg$parseword() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseletter();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseletter();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c33(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsefloat() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseinteger();
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (peg$c34.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parseinteger();
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parsemixed_number() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseinteger();
    if (s2 !== peg$FAILED) {
      s3 = peg$parsespace();
      if (s3 !== peg$FAILED) {
        s4 = peg$parsefraction();
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parseword_number() {
    var s0;

    if (input.substr(peg$currPos, 3).toLowerCase() === peg$c36) {
      s0 = input.substr(peg$currPos, 3);
      peg$currPos += 3;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c37); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c38) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c39); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 5).toLowerCase() === peg$c40) {
          s0 = input.substr(peg$currPos, 5);
          peg$currPos += 5;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c42) {
            s0 = input.substr(peg$currPos, 4);
            peg$currPos += 4;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c43); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 4).toLowerCase() === peg$c44) {
              s0 = input.substr(peg$currPos, 4);
              peg$currPos += 4;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c45); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 3).toLowerCase() === peg$c46) {
                s0 = input.substr(peg$currPos, 3);
                peg$currPos += 3;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c47); }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 5).toLowerCase() === peg$c48) {
                  s0 = input.substr(peg$currPos, 5);
                  peg$currPos += 5;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c49); }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 5).toLowerCase() === peg$c50) {
                    s0 = input.substr(peg$currPos, 5);
                    peg$currPos += 5;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c51); }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c52) {
                      s0 = input.substr(peg$currPos, 4);
                      peg$currPos += 4;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c53); }
                    }
                    if (s0 === peg$FAILED) {
                      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c54) {
                        s0 = input.substr(peg$currPos, 3);
                        peg$currPos += 3;
                      } else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c55); }
                      }
                      if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 6).toLowerCase() === peg$c56) {
                          s0 = input.substr(peg$currPos, 6);
                          peg$currPos += 6;
                        } else {
                          s0 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c57); }
                        }
                        if (s0 === peg$FAILED) {
                          if (input.substr(peg$currPos, 6).toLowerCase() === peg$c58) {
                            s0 = input.substr(peg$currPos, 6);
                            peg$currPos += 6;
                          } else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c59); }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsecouple() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parsearticle();
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 32) {
        s3 = peg$c20;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      if (s3 !== peg$FAILED) {
        if (input.substr(peg$currPos, 6).toLowerCase() === peg$c60) {
          s4 = input.substr(peg$currPos, 6);
          peg$currPos += 6;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c61); }
        }
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parsefew() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parsearticle();
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    if (s2 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 32) {
        s3 = peg$c20;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      if (s3 !== peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c62) {
          s4 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c63); }
        }
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parsefraction() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseinteger();
    if (s2 !== peg$FAILED) {
      if (peg$c64.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c65); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parseinteger();
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parseinteger() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c66.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c67); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c66.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c67); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c68(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseletter() {
    var s0;

    if (peg$c69.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c70); }
    }

    return s0;
  }

  function peg$parseunit() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseenglish_unit();
    if (s2 !== peg$FAILED) {
      s3 = peg$currPos;
      peg$silentFails++;
      s4 = peg$parseletter();
      peg$silentFails--;
      if (s4 === peg$FAILED) {
        s3 = void 0;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsemetric_unit();
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseletter();
        peg$silentFails--;
        if (s4 === peg$FAILED) {
          s3 = void 0;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parseimprecise_unit();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parseletter();
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = void 0;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }
    }

    return s0;
  }

  function peg$parseenglish_unit() {
    var s0;

    s0 = peg$parsecup();
    if (s0 === peg$FAILED) {
      s0 = peg$parsefluid_ounce();
      if (s0 === peg$FAILED) {
        s0 = peg$parsegallon();
        if (s0 === peg$FAILED) {
          s0 = peg$parseounce();
          if (s0 === peg$FAILED) {
            s0 = peg$parsepint();
            if (s0 === peg$FAILED) {
              s0 = peg$parsepound();
              if (s0 === peg$FAILED) {
                s0 = peg$parsequart();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsetablespoon();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseteaspoon();
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsecup() {
    var s0;

    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c71) {
      s0 = input.substr(peg$currPos, 4);
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c72); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c73) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c74); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2).toLowerCase() === peg$c75) {
          s0 = input.substr(peg$currPos, 2);
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c76); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 1).toLowerCase() === peg$c77) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c78); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsefluid_ounce() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsefluid();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsews();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseounce();
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefluid() {
    var s0, s1, s2;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c79) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c80); }
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c81) {
        s1 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c82); }
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c83;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c84); }
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsegallon() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c85) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c86); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c87) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c88); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 4).toLowerCase() === peg$c89) {
          s0 = input.substr(peg$currPos, 4);
          peg$currPos += 4;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c90); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 3).toLowerCase() === peg$c91) {
            s0 = input.substr(peg$currPos, 3);
            peg$currPos += 3;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c92); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseounce() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c93) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c94); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c95) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c96); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c97) {
          s0 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c98); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2).toLowerCase() === peg$c99) {
            s0 = input.substr(peg$currPos, 2);
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c100); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsepint() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c101) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c102); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c103) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c104); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c105) {
          s0 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c106); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2).toLowerCase() === peg$c107) {
            s0 = input.substr(peg$currPos, 2);
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c108); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsepound() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c109) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c110); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c111) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c112); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 4).toLowerCase() === peg$c113) {
          s0 = input.substr(peg$currPos, 4);
          peg$currPos += 4;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c114); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 3).toLowerCase() === peg$c115) {
            s0 = input.substr(peg$currPos, 3);
            peg$currPos += 3;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c116); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 3).toLowerCase() === peg$c117) {
              s0 = input.substr(peg$currPos, 3);
              peg$currPos += 3;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c118); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 2).toLowerCase() === peg$c119) {
                s0 = input.substr(peg$currPos, 2);
                peg$currPos += 2;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c120); }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsequart() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c121) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c122); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c123) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c124); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 4).toLowerCase() === peg$c125) {
          s0 = input.substr(peg$currPos, 4);
          peg$currPos += 4;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c126); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 3).toLowerCase() === peg$c127) {
            s0 = input.substr(peg$currPos, 3);
            peg$currPos += 3;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c128); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 3).toLowerCase() === peg$c129) {
              s0 = input.substr(peg$currPos, 3);
              peg$currPos += 3;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c130); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 2).toLowerCase() === peg$c131) {
                s0 = input.substr(peg$currPos, 2);
                peg$currPos += 2;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c132); }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsetablespoon() {
    var s0;

    if (input.substr(peg$currPos, 11).toLowerCase() === peg$c133) {
      s0 = input.substr(peg$currPos, 11);
      peg$currPos += 11;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c134); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 10).toLowerCase() === peg$c135) {
        s0 = input.substr(peg$currPos, 10);
        peg$currPos += 10;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c136); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 5).toLowerCase() === peg$c137) {
          s0 = input.substr(peg$currPos, 5);
          peg$currPos += 5;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c138); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c139) {
            s0 = input.substr(peg$currPos, 4);
            peg$currPos += 4;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c140); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 4).toLowerCase() === peg$c141) {
              s0 = input.substr(peg$currPos, 4);
              peg$currPos += 4;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c142); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 3).toLowerCase() === peg$c143) {
                s0 = input.substr(peg$currPos, 3);
                peg$currPos += 3;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c144); }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c145) {
                  s0 = peg$c145;
                  peg$currPos += 2;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c146); }
                }
                if (s0 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 84) {
                    s0 = peg$c147;
                    peg$currPos++;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c148); }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseteaspoon() {
    var s0;

    if (input.substr(peg$currPos, 9).toLowerCase() === peg$c149) {
      s0 = input.substr(peg$currPos, 9);
      peg$currPos += 9;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c150); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c151) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c152); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 4).toLowerCase() === peg$c153) {
          s0 = input.substr(peg$currPos, 4);
          peg$currPos += 4;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c154); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 3).toLowerCase() === peg$c155) {
            s0 = input.substr(peg$currPos, 3);
            peg$currPos += 3;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c156); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c157) {
              s0 = peg$c157;
              peg$currPos += 2;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c158); }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 116) {
                s0 = peg$c159;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c160); }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsemetric_unit() {
    var s0;

    s0 = peg$parsekilogram();
    if (s0 === peg$FAILED) {
      s0 = peg$parsegram();
      if (s0 === peg$FAILED) {
        s0 = peg$parsemilligram();
        if (s0 === peg$FAILED) {
          s0 = peg$parseliter();
          if (s0 === peg$FAILED) {
            s0 = peg$parsedeciliter();
            if (s0 === peg$FAILED) {
              s0 = peg$parsecentiliter();
              if (s0 === peg$FAILED) {
                s0 = peg$parsemilliliter();
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsegram() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c161) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c162); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c163) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c164); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c165) {
          s0 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c166); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2).toLowerCase() === peg$c167) {
            s0 = input.substr(peg$currPos, 2);
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c168); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 2).toLowerCase() === peg$c169) {
              s0 = input.substr(peg$currPos, 2);
              peg$currPos += 2;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c170); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 1).toLowerCase() === peg$c171) {
                s0 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c172); }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsekilogram() {
    var s0;

    if (input.substr(peg$currPos, 9).toLowerCase() === peg$c173) {
      s0 = input.substr(peg$currPos, 9);
      peg$currPos += 9;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c174); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c175) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c176); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c177) {
          s0 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c178); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2).toLowerCase() === peg$c179) {
            s0 = input.substr(peg$currPos, 2);
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c180); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseliter() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c181) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c182); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c183) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c184); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2).toLowerCase() === peg$c185) {
          s0 = input.substr(peg$currPos, 2);
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c186); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 1).toLowerCase() === peg$c187) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c188); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsemilligram() {
    var s0;

    if (input.substr(peg$currPos, 10).toLowerCase() === peg$c189) {
      s0 = input.substr(peg$currPos, 10);
      peg$currPos += 10;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c190); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c191) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c192); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c193) {
          s0 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c194); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2).toLowerCase() === peg$c195) {
            s0 = input.substr(peg$currPos, 2);
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c196); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsemilliliter() {
    var s0;

    if (input.substr(peg$currPos, 11).toLowerCase() === peg$c197) {
      s0 = input.substr(peg$currPos, 11);
      peg$currPos += 11;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c198); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 10).toLowerCase() === peg$c199) {
        s0 = input.substr(peg$currPos, 10);
        peg$currPos += 10;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c200); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c201) {
          s0 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c202); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2).toLowerCase() === peg$c203) {
            s0 = input.substr(peg$currPos, 2);
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c204); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsecentiliter() {
    var s0;

    if (input.substr(peg$currPos, 11).toLowerCase() === peg$c205) {
      s0 = input.substr(peg$currPos, 11);
      peg$currPos += 11;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c206); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 10).toLowerCase() === peg$c207) {
        s0 = input.substr(peg$currPos, 10);
        peg$currPos += 10;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c208); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c209) {
          s0 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c210); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2).toLowerCase() === peg$c211) {
            s0 = input.substr(peg$currPos, 2);
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c212); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsedeciliter() {
    var s0;

    if (input.substr(peg$currPos, 10).toLowerCase() === peg$c213) {
      s0 = input.substr(peg$currPos, 10);
      peg$currPos += 10;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c214); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c215) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c216); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c217) {
          s0 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c218); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2).toLowerCase() === peg$c219) {
            s0 = input.substr(peg$currPos, 2);
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c220); }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseimprecise_unit() {
    var s0;

    s0 = peg$parsebag();
    if (s0 === peg$FAILED) {
      s0 = peg$parsebar();
      if (s0 === peg$FAILED) {
        s0 = peg$parsebottle();
        if (s0 === peg$FAILED) {
          s0 = peg$parsebowl();
          if (s0 === peg$FAILED) {
            s0 = peg$parsebreast();
            if (s0 === peg$FAILED) {
              s0 = peg$parsebulb();
              if (s0 === peg$FAILED) {
                s0 = peg$parsebun();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsebunch();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsecan();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsecarton();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parsecone();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parseclove();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parselarge();
                            if (s0 === peg$FAILED) {
                              s0 = peg$parsemedium();
                              if (s0 === peg$FAILED) {
                                s0 = peg$parsemini();
                                if (s0 === peg$FAILED) {
                                  s0 = peg$parsesmall();
                                  if (s0 === peg$FAILED) {
                                    s0 = peg$parsecube();
                                    if (s0 === peg$FAILED) {
                                      s0 = peg$parsefillet();
                                      if (s0 === peg$FAILED) {
                                        s0 = peg$parsehead();
                                        if (s0 === peg$FAILED) {
                                          s0 = peg$parsejar();
                                          if (s0 === peg$FAILED) {
                                            s0 = peg$parsepackage();
                                            if (s0 === peg$FAILED) {
                                              s0 = peg$parsepacket();
                                              if (s0 === peg$FAILED) {
                                                s0 = peg$parsepack();
                                                if (s0 === peg$FAILED) {
                                                  s0 = peg$parsepatty();
                                                  if (s0 === peg$FAILED) {
                                                    s0 = peg$parsepiece();
                                                    if (s0 === peg$FAILED) {
                                                      s0 = peg$parseportion();
                                                      if (s0 === peg$FAILED) {
                                                        s0 = peg$parseservings();
                                                        if (s0 === peg$FAILED) {
                                                          s0 = peg$parseroll();
                                                          if (s0 === peg$FAILED) {
                                                            s0 = peg$parseslice();
                                                            if (s0 === peg$FAILED) {
                                                              s0 = peg$parsehandful();
                                                              if (s0 === peg$FAILED) {
                                                                s0 = peg$parsepinch();
                                                                if (s0 === peg$FAILED) {
                                                                  s0 = peg$parsetouch();
                                                                  if (s0 === peg$FAILED) {
                                                                    s0 = peg$parseenvelope();
                                                                    if (s0 === peg$FAILED) {
                                                                      s0 = peg$parsesprig();
                                                                      if (s0 === peg$FAILED) {
                                                                        s0 = peg$parsesheet();
                                                                        if (s0 === peg$FAILED) {
                                                                          s0 = peg$parsedash();
                                                                          if (s0 === peg$FAILED) {
                                                                            s0 = peg$parsesplash();
                                                                            if (s0 === peg$FAILED) {
                                                                              s0 = peg$parseunit_();
                                                                              if (s0 === peg$FAILED) {
                                                                                s0 = peg$parsecontainer_();
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsebag() {
    var s0;

    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c221) {
      s0 = input.substr(peg$currPos, 4);
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c222); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c223) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c224); }
      }
    }

    return s0;
  }

  function peg$parsebar() {
    var s0;

    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c225) {
      s0 = input.substr(peg$currPos, 4);
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c226); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c227) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c228); }
      }
    }

    return s0;
  }

  function peg$parsebottle() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c229) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c230); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c231) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c232); }
      }
    }

    return s0;
  }

  function peg$parsebowl() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c233) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c234); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c235) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c236); }
      }
    }

    return s0;
  }

  function peg$parsebreast() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c237) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c238); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c239) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c240); }
      }
    }

    return s0;
  }

  function peg$parsebulb() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c241) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c242); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c243) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c244); }
      }
    }

    return s0;
  }

  function peg$parsebun() {
    var s0;

    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c245) {
      s0 = input.substr(peg$currPos, 4);
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c246); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c247) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c248); }
      }
    }

    return s0;
  }

  function peg$parsebunch() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c249) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c250); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c251) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c252); }
      }
    }

    return s0;
  }

  function peg$parsecan() {
    var s0;

    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c253) {
      s0 = input.substr(peg$currPos, 4);
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c254); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c255) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c256); }
      }
    }

    return s0;
  }

  function peg$parsecarton() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c257) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c258); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c259) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c260); }
      }
    }

    return s0;
  }

  function peg$parsecone() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c261) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c262); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c263) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c264); }
      }
    }

    return s0;
  }

  function peg$parseclove() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c265) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c266); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c267) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c268); }
      }
    }

    return s0;
  }

  function peg$parselarge() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c269) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c270); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c271) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c272); }
      }
    }

    return s0;
  }

  function peg$parsemedium() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c273) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c274); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c275) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c276); }
      }
    }

    return s0;
  }

  function peg$parsemini() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c277) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c278); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c279) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c280); }
      }
    }

    return s0;
  }

  function peg$parsesmall() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c281) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c282); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c283) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c284); }
      }
    }

    return s0;
  }

  function peg$parsecube() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c285) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c286); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c287) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c288); }
      }
    }

    return s0;
  }

  function peg$parsefillet() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c289) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c290); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c291) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c292); }
      }
    }

    return s0;
  }

  function peg$parsehead() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c293) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c294); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c295) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c296); }
      }
    }

    return s0;
  }

  function peg$parsejar() {
    var s0;

    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c297) {
      s0 = input.substr(peg$currPos, 4);
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c298); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c299) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c300); }
      }
    }

    return s0;
  }

  function peg$parsepackage() {
    var s0;

    if (input.substr(peg$currPos, 8).toLowerCase() === peg$c301) {
      s0 = input.substr(peg$currPos, 8);
      peg$currPos += 8;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c302); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c303) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c304); }
      }
    }

    return s0;
  }

  function peg$parsepacket() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c305) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c306); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c307) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c308); }
      }
    }

    return s0;
  }

  function peg$parsepack() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c309) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c310); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c311) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c312); }
      }
    }

    return s0;
  }

  function peg$parsepatty() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c313) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c314); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c315) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c316); }
      }
    }

    return s0;
  }

  function peg$parsepiece() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c317) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c318); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c319) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c320); }
      }
    }

    return s0;
  }

  function peg$parseportion() {
    var s0;

    if (input.substr(peg$currPos, 8).toLowerCase() === peg$c321) {
      s0 = input.substr(peg$currPos, 8);
      peg$currPos += 8;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c322); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c323) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c324); }
      }
    }

    return s0;
  }

  function peg$parseservings() {
    var s0;

    if (input.substr(peg$currPos, 10).toLowerCase() === peg$c325) {
      s0 = input.substr(peg$currPos, 10);
      peg$currPos += 10;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c326); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c327) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c328); }
      }
    }

    return s0;
  }

  function peg$parseroll() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c329) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c330); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c331) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c332); }
      }
    }

    return s0;
  }

  function peg$parseslice() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c333) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c334); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c335) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c336); }
      }
    }

    return s0;
  }

  function peg$parsehandful() {
    var s0;

    if (input.substr(peg$currPos, 8).toLowerCase() === peg$c337) {
      s0 = input.substr(peg$currPos, 8);
      peg$currPos += 8;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c338); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c339) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c340); }
      }
    }

    return s0;
  }

  function peg$parsepinch() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c341) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c342); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c343) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c344); }
      }
    }

    return s0;
  }

  function peg$parsetouch() {
    var s0;

    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c345) {
      s0 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c346); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c347) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c348); }
      }
    }

    return s0;
  }

  function peg$parseenvelope() {
    var s0;

    if (input.substr(peg$currPos, 9).toLowerCase() === peg$c349) {
      s0 = input.substr(peg$currPos, 9);
      peg$currPos += 9;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c350); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c351) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c352); }
      }
    }

    return s0;
  }

  function peg$parsesprig() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c353) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c354); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c355) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c356); }
      }
    }

    return s0;
  }

  function peg$parsesheet() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c357) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c358); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c359) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c360); }
      }
    }

    return s0;
  }

  function peg$parsesplash() {
    var s0;

    if (input.substr(peg$currPos, 8).toLowerCase() === peg$c361) {
      s0 = input.substr(peg$currPos, 8);
      peg$currPos += 8;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c362); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c363) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c364); }
      }
    }

    return s0;
  }

  function peg$parsedash() {
    var s0;

    if (input.substr(peg$currPos, 6).toLowerCase() === peg$c365) {
      s0 = input.substr(peg$currPos, 6);
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c366); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c367) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c368); }
      }
    }

    return s0;
  }

  function peg$parseunit_() {
    var s0;

    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c369) {
      s0 = input.substr(peg$currPos, 5);
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c370); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c371) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c372); }
      }
    }

    return s0;
  }

  function peg$parsecontainer_() {
    var s0;

    if (input.substr(peg$currPos, 10).toLowerCase() === peg$c373) {
      s0 = input.substr(peg$currPos, 10);
      peg$currPos += 10;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c374); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c375) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c376); }
      }
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};

},{}],2:[function(require,module,exports){
window.parser = require("ingredients-parser");


},{"ingredients-parser":1}]},{},[2]);
