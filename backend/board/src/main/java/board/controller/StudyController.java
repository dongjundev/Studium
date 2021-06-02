package board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import board.dto.StudyDto;
import board.service.StudyService;

@Controller
public class StudyController {
	
	@Autowired
	private StudyService studyService;
	
	@RequestMapping("/home")
	public ModelAndView selectStudyList() throws Exception{
		ModelAndView mv = new ModelAndView("/home");
		List<StudyDto> list = studyService.selectStudyList();
		mv.addObject("list", list);
		return mv;
	}
	
	@RequestMapping("/searchStudyList.do")
	public ModelAndView searchStudyList() throws Exception{
		ModelAndView mv = new ModelAndView("/searchStudyList");
		return mv;
	}
	
}
