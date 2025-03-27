
package com.capgemini.JobBoard.service;

import com.capgemini.JobBoard.model.User;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
}
