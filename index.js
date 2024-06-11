const initialTableData = [
  ["", "Dom nr. 1", "Dom nr. 2", "Dom nr. 3", "Dom nr. 4", "Dom nr. 5"],
  ["Narodowość", "", "", "", "", ""],
  ["Kolor domu", "", "", "", "", ""],
  ["Co pije", "", "", "", "", ""],
  ["Co pali", "", "", "", "", ""],
  ["Zwierze", "", "", "", "", ""],
];

const nationalities = ["Duńczyk", "Anglik", "Norweg", "Szwed", "Niemiec"];
const houseColor = ["Żółty", "Biały", "Czerwony", "Niebieski", "Zielony"];
const whatHeDrinks = ["Piwo", "Woda", "Herbata", "Mleko", "Kawa"];
const whatHeSmokes = [
  "Cygaro",
  "Bez filtra",
  "Papierosy Light",
  "Fajka",
  "Mentolowe",
];
const whatPetHeOwns = ["Kot", "Ptak", "Koń", "Pies"];

const combinedListOfData = [
  ...nationalities,
  ...houseColor,
  ...whatHeDrinks,
  ...whatHeSmokes,
  ...whatPetHeOwns,
];

const hints = [
  "Norweg zamieszkuje pierwszy dom.",
  "Anglik mieszka w czerwonym domu.",
  "Zielony dom znajduje się bezpośrednio po lewej stronie domu białego.",
  "Duńczyk pija herbatkę.",
  "Palacz papierosów light mieszka obok hodowcy kotów.",
  "Mieszkaniec żółtego domu pali cygara.",
  "Niemiec pali fajkę.",
  "Mieszkaniec środkowego domu pija mleko.",
  "Palacz papierosów light ma sąsiada, który pija wodę.",
  "Palacz papierosów bez filtra hoduje ptaki.",
  "Szwed hoduje psy.",
  "Norweg mieszka obok niebieskiego domu.",
  "Hodowca koni mieszka obok żółtego domu.",
  "Palacz mentolowych pija piwo.",
  "W zielonym domu pija się kawę.",
];

const app = Vue.createApp({
  data() {
    return {
      hintsList: hints,
      tableData: initialTableData,
      dragAndDropItemsList: combinedListOfData,
      draggingItem: null,
      highlightedHints: Array(hints.length).fill(false),
      focusedBox: { row: null, col: null },
      highlightedBoxes: [
        Array(6).fill(false),
        Array(6).fill(false),
        Array(6).fill(false),
        Array(6).fill(false),
        Array(6).fill(false),
        Array(6).fill(false),
      ],
      readyToAnswer: false,
      correctSolution: null,
      answerGiven: null,
      buttonsDisabled: false,
    };
  },

  methods: {
    handleDragStart(item) {
      this.draggingItem = item;
      //   console.log(item);
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(rowIndex, colIndex) {
      if (rowIndex > 0 && colIndex > 0) {
        this.tableData[rowIndex][colIndex] = this.draggingItem;
        this.removeItemFromList(this.draggingItem);
        this.draggingItem = null;
      }
    },
    removeItemFromList(item) {
      const index = this.dragAndDropItemsList.indexOf(item);
      if (index > -1) {
        this.dragAndDropItemsList.splice(index, 1);
      }
    },
    toggleHint(index) {
      this.highlightedHints[index] = !this.highlightedHints[index];
    },

    focusBox(rowId, colId) {
      if (this.focusedBox.row != null && this.focusedBox.col != null) {
        this.highlightedBoxes[this.focusedBox.row][this.focusedBox.col] = false;
      }
      this.focusedBox.row = rowId;
      this.focusedBox.col = colId;
      //   console.log(this.focusedBox);
      this.highlightedBoxes[rowId][colId] =
        !this.highlightedBoxes[rowId][colId];
    },
    erease() {
      if (this.focusedBox.row != null && this.focusedBox.col != null) {
        let boxContent =
          this.tableData[this.focusedBox.row][this.focusedBox.col];
        if (
          !this.dragAndDropItemsList.includes(boxContent) &&
          boxContent != ""
        ) {
          this.dragAndDropItemsList.push(boxContent);
        }

        this.tableData[this.focusedBox.row][this.focusedBox.col] = "";
      }
    },
    solvePopUp() {
      this.readyToAnswer = true;
    },
    checkSolution(num) {
      if (num === 4) {
        this.correctSolution = true;
      } else {
        this.correctSolution = false;
      }

      this.answerGiven = true;
      this.buttonsDisabled = true;
    }
  },
});

app.mount("#game");
