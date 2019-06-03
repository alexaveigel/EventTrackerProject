package com.skilldistillery.mood.services;

import java.util.List;

import com.skilldistillery.mood.entities.Mood;

public interface MoodService {

	List<Mood> findAllMoods();
	
	Mood findMoodById(Integer id);
	
	Boolean deleteMoodById(Integer id);
	
	Mood createMood(Mood mood);
	
	Mood editMood(Integer id, Mood mood);
	
}
