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

    public void createTask(String title) {
        Task task = new Task();
        task.setTitle(title);
        task.setCompleted(false);
        taskRepository.save(task);
    }

    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }

    public void toggleTask(long id) {
        Task task = taskRepository.findById(id)
        .orElseThrow(()->new IllegalArgumentException("Invalid task id"));
                task.setCompleted(!task.isCompleted());
        taskRepository.save(task);
    }
}
