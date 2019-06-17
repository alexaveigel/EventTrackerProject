package com.skilldistillery.mood.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.mood.entities.Mood;
import com.skilldistillery.mood.services.MoodService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4203" })
public class MoodController {

	@Autowired
	private MoodService svc;

	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	@GetMapping(path = "moods")
	public List<Mood> findAllMoods() {
		return svc.findAllMoods();
	}
	
	@GetMapping(path = "moods/{id}")
	public Mood findMoodById(@PathVariable int id, HttpServletResponse resp) {
		Mood mood = svc.findMoodById(id);
		if (mood == null) {
			resp.setStatus(404);
		}
		return mood;
	}
	
	@PostMapping(path = "moods")
	public Mood createMood(@RequestBody Mood mood, HttpServletRequest req, HttpServletResponse resp) {
		try {
			if (svc.createMood(mood) != null) {
				resp.setStatus(201);
				StringBuffer sb = req.getRequestURL();
				sb.append("/").append(mood.getId());
				resp.addHeader("Location", sb.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
			mood = null;
			resp.setStatus(400);
		}
		return mood;
	}
	
	@PutMapping(path = "moods/{id}")
	public Mood editMood(@PathVariable int id, @RequestBody Mood mood, HttpServletRequest req,
			HttpServletResponse resp) {
		mood = svc.editMood(id, mood);
		if (mood == null) {
			resp.setStatus(404);
		}
		return mood;
	}
	
	@DeleteMapping(path = "moods/{id}")
	public Boolean deleteMoodById(@PathVariable int id, HttpServletResponse resp) {
		Boolean deleted = svc.deleteMoodById(id);
		if (deleted) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return deleted;
	}
}
