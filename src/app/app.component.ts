import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from './counter/counter.component';
import { XmlviewerComponent } from './xmlviewer/xmlviewer.component';

@Component({
  selector: 'peg-solitaire',
  imports: [CommonModule, FormsModule, CounterComponent, XmlviewerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name: string = '';
  grid: number[][];

  constructor() {
    // Create a 2D array for a 7x7 grid
    this.grid = Array.from({ length: 7 }, () => Array(7).fill(0));
  }

  // Function to determine if the cell should be hidden
  isHidden(row: number, col: number): boolean {
    const hiddenCells = [
      [0, 0], [0, 1], [1, 0], [1, 1],   // Top-left corner
      [0, 5], [0, 6], [1, 5], [1, 6],   // Top-right corner
      [5, 0], [5, 1], [6, 0], [6, 1],   // Bottom-left corner
      [5, 5], [5, 6], [6, 5], [6, 6]    // Bottom-right corner
    ];

    return hiddenCells.some(([hiddenRow, hiddenCol]) => hiddenRow === row && hiddenCol === col);
  }

  board: number[][] = [];

  // Directions for moving (up, down, left, right)
  directions = [
    { x: 0, y: -1 }, // up
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 }   // right
  ];

  ngOnInit(): void {
    this.initBoard();
  }

  // Initialize the board (7x7 grid, -1 for invalid cells, 1 for pegs, 0 for empty)
  initBoard() {
    this.board = [
      [-1, -1, 1, 1, 1, -1, -1],
      [-1, -1, 1, 1, 1, -1, -1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1], // empty spot in the center
      [1, 1, 1, 1, 1, 1, 1],
      [-1, -1, 1, 1, 1, -1, -1],
      [-1, -1, 1, 1, 1, -1, -1]
    ];
  }

  handleCellClick(row: number, col: number) {
    // Handle peg click and move logic here
    if (this.board[row][col] === 1) {
      this.checkMoves(row, col);
    }
  }

  checkMoves(row: number, col: number) {
    for (const direction of this.directions) {
      const newRow = row + direction.y * 2;
      const newCol = col + direction.x * 2;
      const midRow = row + direction.y;
      const midCol = col + direction.x;

      // Check if the move is valid (i.e., jump over a peg into an empty spot)
      if (this.isValidMove(row, col, midRow, midCol, newRow, newCol)) {
        this.makeMove(row, col, midRow, midCol, newRow, newCol);
      }
    }
  }

  isValidMove(oldRow: number, oldCol: number, midRow: number, midCol: number, newRow: number, newCol: number): boolean {
    // Ensure the new position is within bounds
    if (newRow < 0 || newRow >= this.board.length || newCol < 0 || newCol >= this.board[0].length) {
      return false;
    }

    // Check if jumping over a peg and landing in an empty spot
    return (
      this.board[midRow][midCol] === 1 && // there is a peg in the middle
      this.board[newRow][newCol] === 0 && // the destination is empty
      this.board[oldRow][oldCol] === 1    // the original spot has a peg
    );
  }

  makeMove(oldRow: number, oldCol: number, midRow: number, midCol: number, newRow: number, newCol: number) {
    this.board[oldRow][oldCol] = 0; // remove the original peg
    this.board[midRow][midCol] = 0; // remove the jumped-over peg
    this.board[newRow][newCol] = 1; // place peg in the new spot
  }
}
