package board.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import board.dto.MemberDto;
import board.dto.StudyDto;
import board.service.MemberService;
import board.service.StudyService;

@Controller
public class StudyController {
	
	int glo_studyId;
	
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
    
    // 스터디 상세보기
    @RequestMapping("/studyDetail.do")
    public ModelAndView openStudyDetail(@RequestParam(defaultValue="studyId")int studyId) throws Exception{		
 
    	ModelAndView mv = new ModelAndView("studyDetail");		
 
    	//System.out.println("studyID 확인:: "+studyId);
    	StudyDto study = studyService.selectStudyDetail(studyId);
    	
    	glo_studyId=studyId;
    	
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
    public String StudyJoin(@ModelAttribute MemberDto member,HttpSession session) throws Exception{	
    	MemberDto mem=(MemberDto) session.getAttribute("loginUser");
    	
    	if (mem==null) {
    		System.out.println("로그인 해주세요.");
    		return "redirect:/studyDetail.do?studyId="+member.getStudyId();
    	}
    	else {
	    	System.out.println("member확인:: "+member);
	    	int result=memberService.studyJoinChk(member);
	    	System.out.println("result :: "+result);
	    	if (result==0) {
	    		studyService.studyJoin(member);
	    		System.out.println("스터디 가입 완료");
	        	
	    	}else {
	    		System.out.println("중복 가입입니다.");
	    	}
	    	return "redirect:/studyDetail.do?studyId="+member.getStudyId();
    	}
    }
    
    // 스터디 가입 중복 체크
	@ResponseBody
	@RequestMapping(value="user/studyJoinChk", method = RequestMethod.POST)
	public int studyJoinChk(MemberDto memberDto) throws Exception {
		int result = memberService.studyJoinChk(memberDto);
		return result;
	}
	
    
    //-----------------------------------
    // 스터디 장소 예약 화면
    @RequestMapping("/studyLocation.do")		//kakao map api 출력
    public ModelAndView testMap(@RequestParam(defaultValue="studyId")int studyId, HttpSession session) throws Exception{
    	MemberDto mem=(MemberDto) session.getAttribute("loginUser");
    	
    	if (mem==null) {
    		System.out.println("로그인 해주세요.");
    		ModelAndView mv = new ModelAndView("login");
    		return mv;
    	}
    	else {
    		ModelAndView mv = new ModelAndView("studyLocation");		
        	mv.addObject("studyId", studyId);
        	System.out.println("확인:: "+mv);
        	
        	return mv;
    	}
    }
    
    // 장소 예약 
    @RequestMapping("/insertLocation.do")		//지도에서 주소 값 반환
    public String insertLocation(@ModelAttribute StudyDto study) throws Exception{
    	System.out.println("insertLoaction StudyId 확인:: "+study.getStudyId());
    	studyService.insertLocation(study);
    	
    	System.out.println("::장소 등록 완료::");
    	return "redirect:/studyDetail.do?studyId="+study.getStudyId();
    }
    
    //-----------------------------------
    // 스터디 멤버 상세보기
    @RequestMapping("/studyMemberDetail.do")		//지도에서 주소 값 반환
    public ModelAndView StudyMemberDetail(String memberId) throws Exception{
    	
    	ModelAndView mv=new ModelAndView("studyMemberDetail");
    	MemberDto member=memberService.selectStudyMemberDetail(memberId);
    	List<MemberDto> memberList= memberService.selectStudyMember(glo_studyId);
    	
    	//System.out.println("memberList 확인:: "+memberList);
    	mv.addObject("member",member);
    	mv.addObject("memberList",memberList);
    	
    	return mv;
    }

}
