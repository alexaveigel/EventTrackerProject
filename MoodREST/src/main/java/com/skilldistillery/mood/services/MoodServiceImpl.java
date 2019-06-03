package com.skilldistillery.mood.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.mood.entities.Mood;
import com.skilldistillery.mood.repositories.MoodRepository;

@Service
public class MoodServiceImpl implements MoodService {

	@Autowired
	private MoodRepository repo;

	@Override
	public List<Mood> findAllMoods() {
		return repo.findAll();
	}

	@Override
	public Mood findMoodById(Integer id) {
		Mood m = null;
		Optional<Mood> mood = repo.findById(id);
		if (mood.isPresent()) {
			m = mood.get();
		}
		return m;
	}

	@Override
	public Boolean deleteMoodById(Integer id) {
		Optional<Mood> optMood = repo.findById(id);
		if (optMood.isPresent()) {
			Mood mood = optMood.get();
			repo.delete(mood);
			return true;
		} else {
		}
		return false;
	}

	@Override
	public Mood createMood(Mood mood) {
		if (mood != null) {
			return repo.saveAndFlush(mood);
		} else {
			return null;
		}
	}

	@Override
	public Mood editMood(Integer id, Mood mood) {
		Optional<Mood> optMood = repo.findById(id);
		if (optMood.isPresent()) {
			Mood m = optMood.get();
			m.setIntensity(mood.getIntensity());
			m.setLength(mood.getLength());
			m.setPlace(mood.getPlace());
			m.setType(mood.getType());

			return m;
		}
		return null;
	}

}
