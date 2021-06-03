package board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	// ---------------------------------스터디 검색
	
	//스터디 검색 화면 출력
    @RequestMapping("/studyList.do")		
    public String studyList() throws Exception{
    	return "/studyList";
    }
	
    //스터디 검색 결과
    @RequestMapping("/studySearchResult.do")		
    public ModelAndView searchStudy(@RequestParam(defaultValue="searchCondition") String searchCondition,@RequestParam(defaultValue="searchKeyword") String searchKeyword) throws Exception{
    	
    	List<StudyDto> list = studyService.searchStudy(searchCondition,searchKeyword);
    	ModelAndView mv  = new ModelAndView("studySearchResult");
    	
    	/*
    	Map<String,Object> map = new HashMap<String,Object>();
    	map.put("list", list);
    	mv.addObject("map",map);
		System.out.println(map);
    	*/
		mv.addObject("list", list);
		//System.out.println(list);
		
		return mv;
    }

}
