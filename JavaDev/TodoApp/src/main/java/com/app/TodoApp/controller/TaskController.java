package com.app.TodoApp.controller;

import com.app.TodoApp.models.Task;
import com.app.TodoApp.services.TaskService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public String getTask(Model model) {

        List<Task> tasks = taskService.getAllTasks();

        System.out.println("Size = " + tasks.size());

        for (Task task : tasks) {
            System.out.println(task.getTitle());
        }

        model.addAttribute("tasks", tasks);

        return "tasks";
    }
    @PostMapping
    public String createTask(@RequestParam String title) {

        taskService.createTask(title);

        return "redirect:/";
    }
}