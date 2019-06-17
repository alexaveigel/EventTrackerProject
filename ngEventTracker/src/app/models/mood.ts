export class Mood {
  id: number;
  name: string;
  intensity: number;
  length: number;
  place: string;
  description: string;
  moodDate: string;
  constructor(
    id?: number,
    name?: string,
    intensity?: number,
    length?: number,
    place?: string,
    description?: string,
    moodDate?: string
  ) {
    this.id = id;
    this.name = name;
    this.intensity = intensity;
    this.length = length;
    this.place = place;
    this.description = description;
    this.moodDate = moodDate;
  }
}
