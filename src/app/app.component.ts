import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'peg-solitaire',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items = Array.from({ length: 49 }); // Create an array with 49 items (7x7)

  // Function to determine which items to hide
  isHidden(index: number): boolean {
    const hiddenIndices = [
      0, 1, 5, 6,   // Top-left corner
      7, 8, 12, 13, // Top-right corner
      35, 36, 40, 41, // Bottom-left corner
      42, 43, 47, 48 // Bottom-right corner
    ];
    return hiddenIndices.includes(index);
  }

  board: number[][] = [];

  // Directions for moving (up, down, left, right)
  directions = [
    { x: 0, y: -1 }, // up
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 }   // right
  ];

  constructor() {}

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
