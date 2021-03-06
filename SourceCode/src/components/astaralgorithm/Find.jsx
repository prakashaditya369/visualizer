//Implementation of A* Algorithm is here.
import React, { useState } from "react";

function Find(props) {
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function handleClick() {
    if (
      props.targets.target !== undefined &&
      props.targets.starting !== undefined
    ) {
      document.querySelector("#d-start").disabled = true;
      document.querySelector("#d-target").disabled = true;
      document.querySelector("#d-modify").disabled = true;
      document.querySelector("#randombutton").disabled = true;
      /*Disabling buttons and KeyWords Since not required*/
      /*Main Finding Part*/
      //console.log(parseInt(props.targets.starting/props.columns), props.targets.starting%props.columns)
      var starting = {
        row: parseInt(props.targets.starting / props.columns),
        column: props.targets.starting % props.columns,
      };
      var target = {
        row: parseInt(props.targets.target / props.columns),
        column: props.targets.target % props.columns,
      };

      function ManhattenDistance(row, col, target) {
        return Math.abs(row - target.row) + Math.abs(col - target.column);
      }

      function Node(x, y) {
        this.x = x;
        this.y = y;
        this.f = Number.MAX_SAFE_INTEGER;
        this.g = Number.MAX_SAFE_INTEGER;
        this.parent = null;
        this.visited = false;
        this.blocked = false;
      }

      // Priority Queue
      function PriorityQueue() {
        this.array = [];

        this.add = (element) => {
          this.array.push(element);
          this.array = this.array.sort((left, right) =>
            left.f > right.f ? 1 : -1
          );
        };
        this.remove = () => {
          return this.array.shift();
        };
        this.size = () => {
          return this.array.length;
        };
      }

      async function distance() {
        var start = new Node(starting.row, starting.column);
        var end = new Node(target.row, target.column);

        var gridArea = [];
        for (var i = 0; i < props.rows; i++) {
          var temp = [];
          for (var j = 0; j < props.columns; j++) {
            temp.push(new Node(i, j));
            if (props.array[props.columns * i + j] === 0)
              temp[j].blocked = true;
          }
          gridArea.push(temp);
        }
        start.f = 0;
        start.g = 0;
        var queueB = new PriorityQueue();

        //Just Start Thing
        if (start.x - 1 >= 0) {
          var t = gridArea[start.x - 1][start.y];
          var gNew = 1;
          var fNew = gNew + ManhattenDistance(start.x - 1, start.y, target);

          if (!t.visited && !t.blocked && t.f > fNew) {
            t.f = fNew;
            t.g = gNew;
            t.parent = start;
            queueB.add(t);
            gridArea[start.x - 1][start.y] = t;
          }
        }

        if (start.x + 1 < props.rows) {
          var gNew = 1;
          var fNew = gNew + ManhattenDistance(start.x + 1, start.y, target);
          var t = gridArea[start.x + 1][start.y];
          if (!t.visited && !t.blocked && t.f > fNew) {
            t.f = fNew;
            t.g = gNew;
            t.parent = start;
            queueB.add(t);
            gridArea[start.x + 1][start.y] = t;
          }
        }

        if (start.y - 1 > 0) {
          var t = gridArea[start.x][start.y - 1];
          var gNew = 1;
          var fNew = gNew + ManhattenDistance(start.x, start.y - 1, target);
          if (!t.visited && !t.blocked && t.f > fNew) {
            t.f = fNew;
            t.g = gNew;
            t.parent = start;
            queueB.add(t);
            gridArea[start.x][start.y - 1] = t;
          }
        }

        if (start.y + 1 < props.columns) {
          var t = gridArea[start.x][start.y + 1];
          var gNew = 1;
          var fNew = gNew + ManhattenDistance(start.x, start.y + 1, target);
          if (!t.visited && !t.blocked && t.f > fNew) {
            t.f = fNew;
            t.g = gNew;
            t.parent = start;
            queueB.add(t);
            gridArea[start.x][start.y + 1] = t;
          }
        }
        start.visited = true;
        gridArea[start.x][start.y] = start;
        //Just Start thing ends

        while (queueB.size() > 0) {
          var current = queueB.remove();
          document.getElementById(
            current.x * props.columns + current.y
          ).style.borderColor = "orange";
          await timeout(150);
          if (current.x === target.row && current.y === target.column) break;

          if (current.x - 1 >= 0) {
            var t = gridArea[current.x - 1][current.y];
            var gNew = current.g + 1;
            var fNew =
              gNew + ManhattenDistance(current.x - 1, current.y, target);

            if (!t.visited && !t.blocked && t.f > fNew) {
              t.f = fNew;
              t.g = gNew;
              t.parent = current;
              queueB.add(t);
              gridArea[current.x - 1][current.y] = t;

              if (t.x === target.row && t.y === target.column) break;
              document.getElementById(
                t.x * props.columns + t.y
              ).style.background = "yellow";
              await timeout(60);
            }
          }

          if (current.x + 1 < props.rows) {
            var t = gridArea[current.x + 1][current.y];
            var gNew = current.g + 1;
            var fNew =
              gNew + ManhattenDistance(current.x + 1, current.y, target);

            if (!t.visited && !t.blocked && t.f > fNew) {
              t.f = fNew;
              t.g = gNew;
              t.parent = current;
              queueB.add(t);
              gridArea[current.x + 1][current.y] = t;

              if (t.x === target.row && t.y === target.column) break;
              document.getElementById(
                t.x * props.columns + t.y
              ).style.background = "yellow";
              await timeout(60);
            }
          }

          if (current.y - 1 >= 0) {
            var t = gridArea[current.x][current.y - 1];
            var gNew = current.g + 1;
            var fNew =
              gNew + ManhattenDistance(current.x, current.y - 1, target);

            if (!t.visited && !t.blocked && t.f > fNew) {
              t.f = fNew;
              t.g = gNew;
              t.parent = current;
              queueB.add(t);
              gridArea[current.x][current.y - 1] = t;
              if (t.x === target.row && t.y === target.column) break;
              document.getElementById(
                t.x * props.columns + t.y
              ).style.background = "yellow";
              await timeout(60);
            }
          }

          if (current.y + 1 < props.columns) {
            var t = gridArea[current.x][current.y + 1];
            var gNew = current.g + 1;
            var fNew =
              gNew + ManhattenDistance(current.x, current.y + 1, target);

            if (!t.visited && !t.blocked && t.f > fNew) {
              t.f = fNew;
              t.g = gNew;
              t.parent = current;
              queueB.add(t);
              gridArea[current.x][current.y + 1] = t;
              if (t.x === target.row && t.y === target.column) break;
              document.getElementById(
                t.x * props.columns + t.y
              ).style.background = "yellow";
              await timeout(60);
            }
          }
          current.visited = true;
          gridArea[current.x][current.y] = current;
          document.getElementById(
            current.x * props.columns + current.y
          ).style.borderColor = "black";
          document.getElementById(
            current.x * props.columns + current.y
          ).style.background = "orange";
        }

        /*Time for retracing*/
        var address = [];
        var current = gridArea[end.x][end.y];
        while (current.parent !== null) {
          var current = current.parent;
          address.push(current.x * props.columns + current.y);
        }
        console.log(address);
        for (var i = address.length - 2; i >= 0; i--) {
          document.getElementById(address[i]).style.background = "blue";
          await timeout(200);
        }
      }

      await distance();
      /*Enabling buttons Since not required*/
      document.querySelector("#d-start").disabled = false;
      document.querySelector("#d-target").disabled = false;
      document.querySelector("#d-modify").disabled = false;
      document.querySelector("#randombutton").disabled = false;
      /*Enabling buttons and KeyWords*/
    }
  }

  return (
    <button className="bubble-sortbutton" onClick={handleClick}>
      {" "}
      Find{" "}
    </button>
  );
}

export default Find;

