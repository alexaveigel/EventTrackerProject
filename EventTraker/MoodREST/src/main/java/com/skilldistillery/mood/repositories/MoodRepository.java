package com.skilldistillery.mood.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.mood.entities.Mood;

public interface MoodRepository extends JpaRepository<Mood, Integer> {

}
