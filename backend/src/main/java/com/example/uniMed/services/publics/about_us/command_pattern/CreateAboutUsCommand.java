package com.example.uniMed.services.publics.about_us.command_pattern;

import com.example.uniMed.models.AboutUs;
import com.example.uniMed.services.publics.about_us.AboutUsService;

public class CreateAboutUsCommand implements Command {
    private AboutUsService aboutUsService;
    private AboutUs aboutUs;

    public CreateAboutUsCommand(AboutUsService aboutUsService, AboutUs aboutUs) {
        this.aboutUsService = aboutUsService;
        this.aboutUs = aboutUs;
    }

    @Override
    public void execute() {
        aboutUsService.createAboutUs(aboutUs);
    }
}
