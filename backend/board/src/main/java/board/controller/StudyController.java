package board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import board.dto.MemberDto;
import board.dto.StudyDto;
import board.service.MemberService;
import board.service.StudyService;

@Controller
public class StudyController {
	
	@Autowired
	private StudyService studyService;
	
	@Autowired
	private MemberService memberService;
	
	@RequestMapping(value = {"/home", "/"})
	public ModelAndView selectStudyList() throws Exception{
		ModelAndView mv = new ModelAndView("/home");
		List<StudyDto> list = studyService.selectStudyList();
		mv.addObject("list", list);
		return mv;
	}
	
	// ---------------------------------스터디 검색
	
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
		
		return mv;
    }
    
    // 검색 결과에서 스터디 상세보기
    @RequestMapping("/studyDetail.do")
    public ModelAndView openStudyDetail(@RequestParam(defaultValue="studyId")int studyId) throws Exception{		
 
    	ModelAndView mv = new ModelAndView("studyDetail");		
 
    	//System.out.println("studyID 확인:: "+studyId);
    	StudyDto study = studyService.selectStudyDetail(studyId);
    	
    	//스터디 이벤트
    	List<StudyDto> event= studyService.selectStudyEvent(studyId);
    	
    	//스터디 멤버
    	List<MemberDto> member= memberService.selectStudyMember(studyId);
    	
    	mv.addObject("study", study);
    	mv.addObject("event", event);
    	mv.addObject("member", member);
    	
    	//System.out.println("studyDetail member 출력 :: "+member);
    	
    	return mv;
    }
    
    //-----------------------------------
    // 스터디 가입
    @RequestMapping("/studyJoin.do")
    public String StudyJoin(@ModelAttribute MemberDto member) throws Exception{	
    	System.out.println("member확인:: "+member);
    	studyService.studyJoin(member);
    	return "redirect:/studyDetail.do?studyId="+member.getStudyId();
    }
    
    //-----------------------------------
    // 스터디 장소 예약 화면
    @RequestMapping("/studyLocation.do")		//kakao map api 출력
    public ModelAndView testMap(@RequestParam(defaultValue="studyId")int studyId) throws Exception{
    	ModelAndView mv = new ModelAndView("studyLocation");		
    	mv.addObject("studyId", studyId);
    	System.out.println("확인:: "+mv);
    	
    	return mv;
    }
    
    // 장소 예약 
    @RequestMapping("/insertLocation.do")		//지도에서 주소 값 반환
    public String insertLocation(@ModelAttribute StudyDto study) throws Exception{
    	System.out.println("insertLoaction StudyId 확인:: "+study.getStudyId());
    	studyService.insertLocation(study);
    	
    	System.out.println("::장소 등록 완료::");
    	return "redirect:/studyDetail.do?studyId="+study.getStudyId();
    }

}
