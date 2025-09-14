from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from langchain.agents import load_tools
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv
from langchain_core.callbacks import BaseCallbackHandler
from typing import Any, Dict
import panel as pn
import time, threading, os, json
import os

load_dotenv()

#--------------------------------
#human interface

def custom_ask_human_input() -> str:
      global user_input
      while user_input == None:
          time.sleep(1)
      human_comments = user_input
      user_input = None
      return human_comments

#--------------------------------------------------
#call back function

user_input = None
initiate_chat_task_created = False

def callback_function1(output):
    agent_action = output[0][0]
    tool_input_dict = json.loads(agent_action.tool_input)
    question = tool_input_dict.get("question")
    chat_interface.send(question, user="Clinical Assistant", respond=False)


def initiate_chat():
    StartCrew()

def callback(contents: str, user: str, instance: pn.chat.ChatInterface):
    
    global user_input
    user_input = contents
        

#-----------------------------------------------------------
#handler function
avators = {"Clinical Assistant":"https://cdn-icons-png.flaticon.com/512/320/320336.png",
            "Medical Exp":"https://cdn-icons-png.freepik.com/512/6283/6283228.png",
            "General Doctor": "https://cdn-icons-png.flaticon.com/512/387/387561.png"}

class MyCustomHandler(BaseCallbackHandler):

    def __init__(self, agent_name: str) -> None:
        self.agent_name = agent_name
        # print(self)

    # def on_chain_start(self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs: Any) -> None:
    #     """Print out that we are entering a chain."""
    #     chat_interface.send(inputs['input'], user=self.agent_name, avatar=avators[self.agent_name], respond=False)

    def on_chain_end(self, outputs: Dict[str, Any], **kwargs: Any) -> None:
        """Print out that we finished a chain."""
    
        chat_interface.send(outputs['output'], user=self.agent_name, avatar=avators[self.agent_name], respond=False)
        if self.agent_name == "Clinical Assistant":
            chat_interface.send("Medical Diagnostician will join soon with your diagnostic report. Please wait!",user = "System", respond=False)
        elif self.agent_name == "Medical Exp":
            chat_interface.send("General Doctor will join soon!.",user = "System", respond=False)

    def on_agent_action(self, agent_action, **kwargs: Any) -> Any:
        """Run on agent action."""
        tool_input_dict = json.loads(agent_action.tool_input)
        question = None
        if 'query' in tool_input_dict:
            question = tool_input_dict.get('query')
        elif 'custom_ask_human_input' in tool_input_dict:
            question = tool_input_dict.get("custom_ask_human_input")
        elif 'question' in tool_input_dict:
            question = tool_input_dict.get("question")

        chat_interface.send(question, user=self.agent_name, avatar=avators[self.agent_name], respond=False)


#-----------------------------------------------------------
#crew class contains agents and tasks
@CrewBase
class HealthCrew():
    """Health Diagnostic Crew"""
    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    def __init__(self) -> None:

        self.openai_llm = ChatOpenAI(temperature=0,model_name="gpt-4-0125-preview",api_key=os.getenv('OPENAI_API_KEY'))
        self.human = load_tools(["human"],input_func = custom_ask_human_input)


    @agent
    def medical_interviewer(self) -> Agent:
        return Agent(
            config = self.agents_config['Clinical_Assistant'],
            llm = self.openai_llm,
            callbacks = [MyCustomHandler("Clinical Assistant")],
            tools = self.human
        )

    @agent
    def medical_diagnostician(self) -> Agent:
        return Agent(
            config = self.agents_config['Medical_Exp'],
            llm = self.openai_llm,
            callbacks = [MyCustomHandler("Medical Exp")],
        )

    @agent
    def doctor(self) -> Agent:
        return Agent(
            config = self.agents_config['General_Doctor'],
            llm = self.openai_llm,
            callbacks = [MyCustomHandler("General Doctor")],
            tools = self.human
        ) 

    @task
    def collect_symptoms(self) -> Task:
        return Task(
            config = self.tasks_config['med_hist'],
            agent = self.medical_interviewer(),
            tools =self.human,
            # callbacks = [MyCustomHandler("Clinical Assistant")],
            human_input = False
            
        )

    @task
    def preliminary_diagnosis(self) -> Task:
        return Task(
            config = self.tasks_config['diagnosis'],
            agent = self.medical_diagnostician(),
            #context = [collect_symptoms]
            # callback = callback_function,
        )

    @task
    def doc_task(self) -> Task:
        return Task(
            config = self.tasks_config['general_doc_task'],
            agent = self.doctor(),
            #context = [collect_symptoms, preliminary_diagnosis],
            # callback=callback_function,
            tools = self.human,
            human_input = False
        )

    @crew
    def crew(self) -> Crew:
        """Creates the Health Diagnostic crew"""
        return Crew(
            agents =  self.agents,
            tasks = self.tasks,
            process = Process.sequential,
            verbose = 0
        )
    

def StartCrew():
    result = HealthCrew().crew().kickoff()
    chat_interface.disabled = True
    

# ----------------------------------------------------------------
# panel init
chat_interface = pn.chat.ChatInterface(callback=callback)
template = pn.template.FastListTemplate(
    title="Advanced",
    main=[chat_interface],
    site="MediBot",
    site_url="/advanced")
thread = threading.Thread(target=initiate_chat)
thread.start()
template.servable()



