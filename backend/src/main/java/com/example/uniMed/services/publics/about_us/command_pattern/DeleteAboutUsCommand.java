package com.example.uniMed.services.publics.about_us.command_pattern;

import com.example.uniMed.services.publics.about_us.AboutUsService;

public class DeleteAboutUsCommand implements Command {
    private AboutUsService aboutUsService;
    private Long id;

    public DeleteAboutUsCommand(AboutUsService aboutUsService, Long id) {
        this.aboutUsService = aboutUsService;
        this.id = id;
    }

    @Override
    public void execute() {
        aboutUsService.deleteAboutUs(id);
    }
}
