package com.capgemini.JobBoard.repository;

import java.util.Optional;

//public interface UserRepository {
//
//}



import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.JobBoard.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
