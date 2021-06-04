package board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import board.dto.StudyDto;
import board.service.StudyService;

//스터디 만들기
@Controller
@RequestMapping("/studyMake")
public class MakeStudyController {
	
	StudyDto studyDto = null;
	
	@Autowired
	StudyService studyService;
	
	@RequestMapping("")
	public String start() throws Exception{
		return "/makeStudy/start";
	}
	
	@RequestMapping("/start.do")
	public String MakeStudyStart() throws Exception{
		studyDto = new StudyDto();
		return "/makeStudy/location";
	}
	
    @RequestMapping("/location.do")
    public String MakeStudyLocation(StudyDto study) throws Exception{
    	studyDto.setStudyLocation(study.getStudyLocation());
    	return "/makeStudy/topics";
    }
    
    @RequestMapping("/topics.do")
    public String MakeStudyTopics(StudyDto study) throws Exception{
    	studyDto.setStudyTopics(study.getStudyTopics());
    	return "/makeStudy/name";
    }
    
    @RequestMapping("/name.do")
    public String MakeStudyName(StudyDto study) throws Exception{
    	studyDto.setStudyName(study.getStudyName());
    	return "/makeStudy/description";
    }
    
    @RequestMapping("/description.do")
    public String MakeStudyDescription(StudyDto study) throws Exception{
    	studyDto.setStudyDescription(study.getStudyDescription());
    	
    	System.out.println("스터디 이름 : " + studyDto.getStudyName());
    	System.out.println("스터디 상세설명 : " + studyDto.getStudyDescription());
    	System.out.println("스터디 토픽 : " + studyDto.getStudyTopics());
    	System.out.println("스터디 장소 : " + studyDto.getStudyLocation());
    	studyService.insertStudy(studyDto);
    	studyDto = null;
    	return "/makeStudy/complete";
    }
}
