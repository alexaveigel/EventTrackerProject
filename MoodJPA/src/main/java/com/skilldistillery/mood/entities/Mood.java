package com.skilldistillery.mood.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Mood {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private Integer intensity;

	@Column(name = "length_hours")
	private Double length;

	private String place;

	private String description;

	@Column(name = "mood_date")
	private String moodDate;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getLength() {
		return length;
	}

	public void setLength(Double length) {
		this.length = length;
	}

	public Integer getIntensity() {
		return intensity;
	}

	public void setIntensity(Integer intensity) {
		this.intensity = intensity;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMoodDate() {
		return moodDate;
	}

	public void setMoodDate(String moodDate) {
		this.moodDate = moodDate;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Mood other = (Mood) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Mood [id=" + id + ", name=" + name + ", intensity=" + intensity + ", length=" + length + ", place="
				+ place + ", description=" + description + ", moodDate=" + moodDate + "]";
	}

	public Mood(int id, String name, Integer intensity, Double length, String place, String description,
			String moodDate) {
		super();
		this.id = id;
		this.name = name;
		this.intensity = intensity;
		this.length = length;
		this.place = place;
		this.description = description;
		this.moodDate = moodDate;
	}

	public Mood() {
		super();
	}

}
