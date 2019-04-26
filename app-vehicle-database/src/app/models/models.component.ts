import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Model } from "../interfaces";
@Component({
  selector: "app-models",
  templateUrl: "./models.component.html",
  styleUrls: ["./models.component.css"]
})
export class ModelsComponent implements OnInit {
  year: Number;
  make: String;
  offset: number;
  years: Number[] = [];
  makes: String[] = [];
  models: Model[] = [];
  changed: boolean;
  displayedColumns: string[] = ['year', 'model', 'make'];

  constructor(private http: HttpClient) {
    this.offset = 0;
    this.changed = false;
  }

  ngOnInit() {
    this.getYears();
    this.getMakes();
    this.getModels();
  }

  async getYears() {
    const years = await this.http
      .get<Number[]>("https://vehicle-data.azurewebsites.net/api/years")
      .toPromise();
    this.years = years;
  }
  async getMakes() {
    const makes = await this.http
      .get<String[]>("https://vehicle-data.azurewebsites.net/api/makes")
      .toPromise();
    this.makes = makes;
  }
  async getModels() {
    const models = await this.http
      .get<Model[]>("https://vehicle-data.azurewebsites.net/api/models")
      .toPromise();
    this.models = models;
  }
  async filterList() {
    if(this.changed){
      this.offset = 0;
      this.changed = false;
    }
    if (!this.year && !this.make) {
      const models = await this.http
        .get<Model[]>(
          "https://vehicle-data.azurewebsites.net/api/models?offset=" +
            this.offset +
            "&fetch=10"
        )
        .toPromise();
      this.models = models;
    } else if (!this.year) {
      const models = await this.http
        .get<Model[]>(
          "https://vehicle-data.azurewebsites.net/api/models?make=" +
            this.make +
            "&offset=" +
            this.offset +
            "&fetch=10"
        )
        .toPromise();
      this.models = models;
    } else if (!this.make) {
      const models = await this.http
        .get<Model[]>(
          "https://vehicle-data.azurewebsites.net/api/models?year=" +
            this.year +
            "&offset=" +
            this.offset +
            "&fetch=10"
        )
        .toPromise();
      this.models = models;
    } else {
      const models = await this.http
        .get<Model[]>(
          "https://vehicle-data.azurewebsites.net/api/models?make=" +
            this.make +
            "&year=" +
            this.year +
            "&offset=" +
            this.offset +
            "&fetch=10"
        )
        .toPromise();
      this.models = models;
    }
  }
  increaseOffset() {
    this.offset += 10;
    this.filterList();
  }
  decreaseOffset() {
    if (this.offset >= 10) {
      this.offset -= 10;
    }
    this.filterList();
  }
  setChangedTrue(){
    this.changed = true;
  }
}
