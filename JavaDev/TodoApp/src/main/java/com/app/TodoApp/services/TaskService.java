package com.app.TodoApp.services;

import com.app.TodoApp.models.Task;
import com.app.TodoApp.repository.TaskRepository;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class TaskService {

    private  final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {

        return taskRepository.findAll();
    }
}
