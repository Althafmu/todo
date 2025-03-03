package com.ty.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ty.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
