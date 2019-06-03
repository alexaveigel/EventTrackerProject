package com.skilldistillery.mood.test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.skilldistillery.mood.entities.Mood;

class MoodTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Mood mood;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("Mood");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		mood = em.find(Mood.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		mood = null;
	}
	
	@Test
	void mood_mapping() {
		assertEquals("angry", mood.getType());
		assertEquals("home", mood.getPlace());
		assertEquals(5, mood.getIntensity());
		assertEquals(1.5, mood.getLength());
	}

}
