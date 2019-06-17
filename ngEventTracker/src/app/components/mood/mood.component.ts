import { Component, OnInit } from "@angular/core";
import { Mood } from "src/app/models/mood";
import { MoodService } from "src/app/services/mood.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-mood",
  templateUrl: "./mood.component.html",
  styleUrls: ["./mood.component.css"]
})
export class MoodComponent implements OnInit {
  newMood = new Mood();

  editMood: Mood;

  selected = null;

  moods: Mood[] = [];

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.reloadMoods();
  }

  reloadMoods() {
    this.moodService.index().subscribe(
      good => {
        this.moods = good;
      },
      err => {
        console.log(err);
      }
    );
  }

  displayMood = function(mood) {
    this.selected = mood;
  };

  displayTable = function() {
    this.selected = null;
  };

  addMood(form: NgForm) {
    const newMood = form.value;

    this.moodService.create(newMood).subscribe(
      good => {
        this.reloadMoods();
        form.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  setEditMood() {
    this.editMood = Object.assign({}, this.selected);
  }

  updateMood(updateMood: Mood) {
    console.log(updateMood);
    this.moodService.update(updateMood).subscribe(
      data => {
        console.log(updateMood);
        this.reloadMoods();
        this.editMood = null;
        this.selected = null;
      },
      err => {
        console.log(err);
      }
    );
  }

  delete(id) {
    this.moodService.destroy(id).subscribe(
      data => {
        this.reloadMoods();
      },
      err => {
        console.log(err);
      }
    );
  }

  intensityAvg() {
    let current = 0;
    let total = 0;
    this.reloadMoods();
    for (var i = 0; i < this.moods.length; i++) {
      const mood = this.moods[i];
      current = mood.intensity;
      total += current;
    }
    return total / i;
  }
}
